"""Normalize official catalog images onto one consistent presentation canvas.

The source assets use very different amounts of transparent or white padding.
This script detects the visible vehicle, keeps a small safety margin, and places
it on a shared 1200 x 760 canvas without changing its aspect ratio.
"""

from __future__ import annotations

import base64
import io
import re
from pathlib import Path

from PIL import Image, ImageChops


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "public" / "images" / "hero-catalog"
OUTPUT_DIR = ROOT / "public" / "images" / "hero-catalog-normalized"

CANVAS_SIZE = (1200, 760)
VEHICLE_AREA = (1000, 580)


def open_catalog_image(path: Path) -> Image.Image:
    if path.suffix.lower() != ".svg":
        return Image.open(path).convert("RGBA")

    svg = path.read_text(encoding="utf-8")
    match = re.search(
        r'xlink:href="data:image/[^;]+;base64,([^"]+)"', svg, re.DOTALL
    )
    if not match:
        raise ValueError(f"No embedded raster image found in {path.name}")
    return Image.open(io.BytesIO(base64.b64decode(match.group(1)))).convert("RGBA")


def visible_bounds(image: Image.Image) -> tuple[int, int, int, int]:
    alpha = image.getchannel("A")
    alpha_min, _ = alpha.getextrema()

    if alpha_min < 250:
        mask = alpha.point(lambda value: 255 if value > 10 else 0)
    else:
        rgb = image.convert("RGB")
        corners = (
            rgb.getpixel((0, 0)),
            rgb.getpixel((rgb.width - 1, 0)),
            rgb.getpixel((0, rgb.height - 1)),
            rgb.getpixel((rgb.width - 1, rgb.height - 1)),
        )
        background = tuple(sum(pixel[channel] for pixel in corners) // 4 for channel in range(3))
        difference = ImageChops.difference(
            rgb, Image.new("RGB", rgb.size, background)
        ).convert("L")
        mask = difference.point(lambda value: 255 if value > 18 else 0)

    bounds = mask.getbbox()
    if not bounds:
        raise ValueError(f"Could not detect visible content in {image}")

    left, top, right, bottom = bounds
    width, height = right - left, bottom - top
    pad_x = max(8, round(width * 0.045))
    pad_y = max(8, round(height * 0.055))
    return (
        max(0, left - pad_x),
        max(0, top - pad_y),
        min(image.width, right + pad_x),
        min(image.height, bottom + pad_y),
    )


def normalize(path: Path) -> Path:
    source = open_catalog_image(path)
    crop = source.crop(visible_bounds(source))

    scale = min(VEHICLE_AREA[0] / crop.width, VEHICLE_AREA[1] / crop.height)
    size = (max(1, round(crop.width * scale)), max(1, round(crop.height * scale)))
    resized = crop.resize(size, Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", CANVAS_SIZE, (255, 255, 255, 255))
    position = ((CANVAS_SIZE[0] - size[0]) // 2, (CANVAS_SIZE[1] - size[1]) // 2)
    canvas.alpha_composite(resized, position)

    output = OUTPUT_DIR / f"{path.stem}.webp"
    canvas.convert("RGB").save(output, "WEBP", lossless=True, method=6)
    return output


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    sources = sorted(path for path in SOURCE_DIR.iterdir() if path.is_file())
    for source in sources:
        output = normalize(source)
        print(f"{source.name} -> {output.name}")


if __name__ == "__main__":
    main()

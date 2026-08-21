from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "assets" / "printful"
CANVAS_SIZE = (3600, 4800)
INK = (216, 210, 199, 255)


def prepare_front() -> None:
    reference = Image.open(
        ASSET_DIR / "references" / "hrafn-front-reference.png"
    ).convert("RGB")
    lockup_crop = reference.crop((125, 175, 285, 340))
    luminance = lockup_crop.convert("L")
    alpha = luminance.point(
        lambda value: 0 if value < 92 else min(255, (value - 92) * 4)
    )
    bounds = alpha.getbbox()
    if bounds is None:
        raise RuntimeError("Could not extract the Hrafn front lockup")

    alpha = alpha.crop(bounds)
    extracted = Image.new("RGBA", alpha.size, INK)
    extracted.putalpha(alpha)

    target_width = 2150
    scale = target_width / extracted.width
    extracted = extracted.resize(
        (target_width, round(extracted.height * scale)),
        Image.Resampling.LANCZOS,
    )

    canvas = Image.new("RGBA", CANVAS_SIZE, (0, 0, 0, 0))
    offset = (
        (CANVAS_SIZE[0] - extracted.width) // 2,
        1250,
    )
    canvas.alpha_composite(extracted, offset)
    canvas.save(ASSET_DIR / "hrafn-front-lockup-v4-3600x4800.png", dpi=(300, 300))


def prepare_back() -> None:
    source = Image.open(ASSET_DIR / "hrafn-back-print-v1.png").convert("RGBA")
    max_size = (3400, 4500)
    scale = min(max_size[0] / source.width, max_size[1] / source.height)
    source = source.resize(
        (round(source.width * scale), round(source.height * scale)),
        Image.Resampling.LANCZOS,
    )

    canvas = Image.new("RGBA", CANVAS_SIZE, (0, 0, 0, 0))
    offset = (
        (CANVAS_SIZE[0] - source.width) // 2,
        (CANVAS_SIZE[1] - source.height) // 2,
    )
    canvas.alpha_composite(source, offset)
    canvas.save(ASSET_DIR / "hrafn-back-print-v2-3600x4800.png", dpi=(300, 300))


if __name__ == "__main__":
    prepare_front()
    prepare_back()

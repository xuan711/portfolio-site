from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
IMAGE_ROOT = ROOT / "public" / "images"

CANVAS_SIZE = (1800, 1040)
PAPER = (247, 242, 232)
INK = (47, 41, 48)
WINE = (125, 33, 56)
BLUE = (56, 89, 109)
FONT_PATH = Path("C:/Windows/Fonts/msyh.ttc")
BOLD_FONT_PATH = Path("C:/Windows/Fonts/msyhbd.ttc")


def safe_crop(image: Image.Image, box):
    left, top, right, bottom = box
    left = max(0, min(left, image.width - 1))
    top = max(0, min(top, image.height - 1))
    right = max(left + 1, min(right, image.width))
    bottom = max(top + 1, min(bottom, image.height))
    return image.crop((left, top, right, bottom))


def make_canvas():
    canvas = Image.new("RGB", CANVAS_SIZE, PAPER)
    draw = ImageDraw.Draw(canvas)
    for x in range(0, CANVAS_SIZE[0], 24):
        for y in range(0, CANVAS_SIZE[1], 24):
            draw.point((x, y), fill=(226, 220, 210))
    return canvas


def paste_panel(canvas, source, box, crop, fit="contain", border=3):
    x0, y0, x1, y1 = box
    panel_w = x1 - x0
    panel_h = y1 - y0
    shot = safe_crop(source, crop).convert("RGB")
    if fit == "cover":
        shot = ImageOps.fit(shot, (panel_w, panel_h), Image.Resampling.LANCZOS)
    else:
        shot.thumbnail((panel_w, panel_h), Image.Resampling.LANCZOS)

    shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.rounded_rectangle((x0 + 10, y0 + 12, x1 + 10, y1 + 12), 8, fill=(90, 55, 64, 42))
    shadow = shadow.filter(ImageFilter.GaussianBlur(5))
    canvas.paste(shadow, (0, 0), shadow)

    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle((x0, y0, x1, y1), 7, fill=(255, 255, 253), outline=INK, width=border)
    inner_x = x0 + (panel_w - shot.width) // 2
    inner_y = y0 + (panel_h - shot.height) // 2
    canvas.paste(shot, (inner_x, inner_y))


def add_marks(canvas, count):
    draw = ImageDraw.Draw(canvas)
    draw.rectangle((28, 28, 46, 1012), fill=WINE)
    for i in range(count):
        y = 42 + i * 22
        draw.rectangle((56, y, 80, y + 6), fill=(176, 139, 104))


def compose(source_path, output_path, panels):
    source = Image.open(source_path).convert("RGB")
    canvas = make_canvas()
    for panel in panels:
        paste_panel(canvas, source, panel["box"], panel["crop"], panel.get("fit", "contain"))
    add_marks(canvas, len(panels))
    output_path.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(output_path, quality=94)
    print(f"{output_path.relative_to(ROOT)}")


def font(size, bold=False):
    path = BOLD_FONT_PATH if bold and BOLD_FONT_PATH.exists() else FONT_PATH
    return ImageFont.truetype(str(path), size)


def wrap_text(draw, text, text_font, width):
    lines = []
    current = ""
    for char in text:
        test = current + char
        if draw.textbbox((0, 0), test, font=text_font)[2] <= width:
            current = test
        else:
            if current:
                lines.append(current)
            current = char
    if current:
        lines.append(current)
    return "\n".join(lines)


def build_program_board(output_path):
    canvas = make_canvas()
    draw = ImageDraw.Draw(canvas)
    add_marks(canvas, 5)
    title_font = font(44, bold=True)
    body_font = font(25)
    label_font = font(27, bold=True)
    tiny_font = font(18, bold=True)

    draw.text((112, 58), "05｜程序需求 · 源文档重点页", fill=INK, font=title_font)
    draw.text((112, 120), "程序需要支持的副本功能、运行流程与交付边界", fill=WINE, font=body_font)

    rows = [
        ("P01", "副本选择与界面刷新", "读取副本、难度、队伍和奖励配置；切换选择时同步更新界面。"),
        ("P02", "准入与创建副本", "队长发起后检查全队条件；通过后创建副本并传送，失败不扣除消耗。"),
        ("P03", "局内目标推进", "根据区域、击杀和交互更新全队共享进度；目标完成后进入下一阶段。"),
        ("P04", "死亡、掉线与退出", "按复活次数和倒计时处理死亡；掉线保留120秒；主动退出后不能返回。"),
        ("P05", "结算与副本清理", "通关或失败只结算一次；记录进度、发放个人奖励、生成出口并清理副本。"),
    ]
    y = 182
    for code, label, desc in rows:
        draw.rounded_rectangle((108, y, 1050, y + 132), 8, fill=(255, 255, 252), outline=(208, 197, 183), width=2)
        draw.rectangle((108, y, 190, y + 132), fill=BLUE)
        draw.text((128, y + 45), code, fill=(255, 227, 154), font=tiny_font)
        draw.text((220, y + 20), label, fill=INK, font=label_font)
        draw.multiline_text((220, y + 66), wrap_text(draw, desc, body_font, 790), fill=(86, 78, 80), font=body_font, spacing=8)
        y += 148

    draw.rounded_rectangle((1090, 182, 1700, 920), 8, fill=(56, 89, 109), outline=INK, width=3)
    draw.text((1130, 222), "全局规则摘要", fill=(255, 227, 154), font=font(32, bold=True))
    rules = [
        ("准入", "全队条件通过后再创建实例，失败不扣除消耗。"),
        ("运行", "成员、难度与流程进度由实例记录并在队内共享。"),
        ("异常", "死亡按复活次数处理；掉线资格保留120秒。"),
        ("结算", "通关或失败只结算一次，随后发奖、生成出口并清理实例。"),
    ]
    ry = 300
    for label, desc in rules:
        draw.line((1130, ry - 18, 1660, ry - 18), fill=(255, 255, 255, 70), width=2)
        draw.text((1130, ry), label, fill=(255, 255, 255), font=label_font)
        wrapped = wrap_text(draw, desc, body_font, 490)
        draw.multiline_text((1130, ry + 46), wrapped, fill=(228, 236, 240), font=body_font, spacing=9)
        ry += 145

    draw.text((1130, 852), "内容直接取自《副本挑战系统策划案》", fill=(213, 224, 229), font=font(18))
    output_path.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(output_path, quality=95)
    print(f"{output_path.relative_to(ROOT)}")


def build():
    profiles = {
        # 北郡大牢：把完整长表拆成“定位 / 目标 / 验收”证据块。
        "beijun-case/positioning-focus.png": (
            "beijun-case/positioning.png",
            [
                {"box": (100, 44, 1700, 348), "crop": (0, 0, 1390, 410)},
                {"box": (100, 370, 885, 990), "crop": (0, 405, 1390, 1080)},
                {"box": (915, 370, 1700, 990), "crop": (0, 1070, 1390, 1756)},
            ],
        ),
        "beijun-case/layout-focus.png": (
            "beijun-case/layout.png",
            [{"box": (100, 48, 1700, 990), "crop": (0, 0, 2300, 1272)}],
        ),
        "beijun-case/route-focus.png": (
            "beijun-case/route.png",
            [
                {"box": (100, 44, 1700, 330), "crop": (0, 0, 2550, 410)},
                {"box": (100, 352, 885, 990), "crop": (0, 400, 2550, 1060)},
                {"box": (915, 352, 1700, 990), "crop": (0, 1040, 2550, 1708)},
            ],
        ),
        "beijun-case/pacing-focus.png": (
            "beijun-case/pacing.png",
            [
                {"box": (100, 44, 885, 990), "crop": (0, 0, 1310, 1770)},
                {"box": (915, 44, 1700, 990), "crop": (0, 1690, 1310, 3204)},
            ],
        ),
        "beijun-case/testing-focus.png": (
            "beijun-case/testing.png",
            [
                {"box": (100, 44, 885, 990), "crop": (0, 0, 1260, 790)},
                {"box": (915, 44, 1700, 990), "crop": (0, 730, 1260, 1636)},
            ],
        ),

        # 七星连珠：地图保持全貌，规则、配置和测试表按上下文拆分放大。
        "tutorial-case/tutorial-map-focus.png": (
            "tutorial-case/tutorial-map.png",
            [
                {"box": (100, 44, 885, 990), "crop": (150, 0, 1330, 565)},
                {"box": (915, 44, 1700, 990), "crop": (150, 535, 1330, 1128)},
            ],
        ),
        "tutorial-case/tutorial-stages-focus.png": (
            "tutorial-case/tutorial-stages.png",
            [{"box": (100, 48, 1700, 990), "crop": (45, 115, 2270, 925)}],
        ),
        "tutorial-case/tutorial-bindings-focus.png": (
            "tutorial-case/tutorial-bindings.png",
            [
                {"box": (100, 44, 1700, 505), "crop": (30, 245, 2405, 940)},
                {"box": (100, 535, 1700, 990), "crop": (30, 900, 2405, 1615)},
            ],
        ),
        "tutorial-case/tutorial-testing-focus.png": (
            "tutorial-case/tutorial-testing.png",
            [
                {"box": (100, 44, 885, 990), "crop": (25, 0, 1410, 775)},
                {"box": (915, 44, 1700, 990), "crop": (25, 735, 1410, 1543)},
            ],
        ),

        # 副本系统：不再展示几乎空白的整张工作表，改为概述、规则与验收局部。
        "dungeon-case/dungeon-goals-focus.png": (
            "dungeon-case/dungeon-goals.png",
            [
                {"box": (100, 44, 885, 990), "crop": (25, 0, 1040, 650)},
                {"box": (915, 44, 1700, 990), "crop": (25, 610, 1040, 1282)},
            ],
        ),
        "dungeon-case/dungeon-overview-focus.png": (
            "dungeon-case/dungeon-overview.png",
            [
                {"box": (100, 44, 1700, 420), "crop": (0, 0, 1300, 420)},
                {"box": (100, 452, 1700, 990), "crop": (0, 365, 1300, 1062)},
            ],
        ),
        "dungeon-case/dungeon-program-focus.png": (
            "dungeon-case/dungeon-program.png",
            [
                {"box": (100, 44, 885, 990), "crop": (0, 0, 1160, 760)},
                {"box": (915, 44, 1700, 990), "crop": (0, 720, 1160, 1508)},
            ],
        ),
        "dungeon-case/dungeon-testing-focus.png": (
            "dungeon-case/dungeon-testing.png",
            [
                {"box": (100, 44, 885, 990), "crop": (15, 0, 860, 480)},
                {"box": (915, 44, 1700, 990), "crop": (15, 440, 860, 945)},
            ],
        ),
    }

    for output_rel, (source_rel, panels) in profiles.items():
        compose(IMAGE_ROOT / source_rel, IMAGE_ROOT / output_rel, panels)
    build_program_board(IMAGE_ROOT / "dungeon-case/dungeon-program-focus.png")


if __name__ == "__main__":
    build()

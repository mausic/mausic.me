#!/usr/bin/env bash
# Version: 1.0.0
#
# Description: Generate favicons for website from SVG logo. 
# Also creates browserconfig.xml and site.webmanifest files.
# Dependencies: ImageMagick, pngquant, librsvg
# Usage: ./generate-icons.sh <source> <destination>
# Example: ./generate-icons.sh public/logo.svg public

ICON_PATH="$PWD/$1"
FAVICON_PATH="$PWD/$2"

printf "Icon path: $ICON_PATH\n"
printf "Favicon path: $FAVICON_PATH\n"

ICON_BASE=$(basename "$ICON_PATH")
printf "Icon base: $ICON_BASE\n"
ICON_FILE="${ICON_BASE%.*}"
printf "Icon file: $ICON_FILE\n"

FAVICON_FILE="favicon"

# Use rsvg-convert to create crisp PNG icons from SVG
for size in 16 32 48 150 180 192 512; do
  ICON_OUT=$ICON_FILE-${size}.png
  DIMENSIONS=${size}x${size}
  rsvg-convert -w "$size" -p 300 -d 300 "$ICON_PATH" > "$FAVICON_PATH/$ICON_OUT"
  printf "Created $FAVICON_PATH/$ICON_OUT\n"
  # Use ImageMagick to center the image and make it square
  magick "$FAVICON_PATH/$ICON_OUT" -gravity center -background transparent -resize "$DIMENSIONS" -extent "$DIMENSIONS" "$FAVICON_PATH/temp-$ICON_OUT"
  printf "Resized $FAVICON_PATH/temp-$ICON_OUT\n"
  # Use pngquant to reduce the size of the PNG
  pngquant 256 < "$FAVICON_PATH/temp-$ICON_OUT" > "$FAVICON_PATH/$FAVICON_FILE-$DIMENSIONS.png"
  printf "Quantized $FAVICON_PATH/$FAVICON_FILE-$DIMENSIONS.png\n"
done

# Merge the 16, 32 and 48 pixel versions into a multi-sized ICO file
magick \
  $FAVICON_PATH/$FAVICON_FILE-16x16.png \
  $FAVICON_PATH/$FAVICON_FILE-32x32.png \
  $FAVICON_PATH/$FAVICON_FILE-48x48.png \
  -background transparent \
  $FAVICON_PATH/$FAVICON_FILE.ico
printf "Created $FAVICON_PATH/$FAVICON_FILE.ico\n"

# Create Apple touch icons
mv $FAVICON_PATH/$FAVICON_FILE-180x180.png $FAVICON_PATH/apple-touch-icon.png
printf "Created $FAVICON_PATH/apple-touch-icon.png\n"

# Create Android Chrome icons
mv $FAVICON_PATH/$FAVICON_FILE-192x192.png $FAVICON_PATH/android-chrome-192x192.png
printf "Created $FAVICON_PATH/android-chrome-192x192.png\n"
mv $FAVICON_PATH/$FAVICON_FILE-512x512.png $FAVICON_PATH/android-chrome-512x512.png
printf "Created $FAVICON_PATH/android-chrome-512x512.png\n"

# Create MS tile icon
mv $FAVICON_PATH/$FAVICON_FILE-150x150.png $FAVICON_PATH/mstile-150x150.png
printf "Created $FAVICON_PATH/mstile-150x150.png\n"

# Clean up temporary files
rm $FAVICON_PATH/temp-*.png
rm $FAVICON_PATH/$FAVICON_FILE-48x48.png
rm $FAVICON_PATH/$ICON_FILE-*.png
printf "Cleaned up temporary files\n"

# Create Browserconfig file
cat > $FAVICON_PATH/browserconfig.xml <<EOF
<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square150x150logo src="/mstile-150x150.png"/>
            <TileColor>#ffffff</TileColor>
        </tile>
    </msapplication>
</browserconfig>
EOF

# Create manifest file
cat > $FAVICON_PATH/site.webmanifest <<EOF
{
  "name": "",
  "short_name": "",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone"
}
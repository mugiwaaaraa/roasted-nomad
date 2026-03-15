const sharp = require('sharp')
const path = require('path')

const input = path.join(__dirname, '../public/logo.png')
const output = path.join(__dirname, '../public/logo-dark.png')

async function makeDarkLogo() {
  const image = sharp(input)
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info
  const pixels = new Uint8Array(data)

  for (let i = 0; i < pixels.length; i += channels) {
    const r = pixels[i]
    const g = pixels[i + 1]
    const b = pixels[i + 2]
    const a = pixels[i + 3]

    // Replace dark brown pixels (espresso color) with white
    // Leave transparent pixels, pink flowers, and green leaves intact
    if (a > 10 && r < 80 && g < 50 && b < 50) {
      pixels[i] = 255
      pixels[i + 1] = 255
      pixels[i + 2] = 255
    }
  }

  await sharp(Buffer.from(pixels), {
    raw: { width, height, channels },
  })
    .png()
    .toFile(output)

  console.log(`logo-dark.png created at ${output}`)
}

makeDarkLogo().catch(console.error)

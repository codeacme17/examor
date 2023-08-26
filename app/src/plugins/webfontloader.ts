export async function loadFonts() {
  const webFontLoader = await import(
    /* webpackChunkName: "webfontloader" */ 'webfontloader'
  )

  webFontLoader.load({
    google: {
      families: [
        'Poppins:100,300,400,500,700,900&display=swap',
        'JetBrains Mono',
      ],
    },
  })
}

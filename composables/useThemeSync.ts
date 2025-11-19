export const useThemeSync = () => {
  const colorMode = useColorMode()
  const { init, send } = useSync('theme-sync')

  init((event) => {
    const { type, data } = event.data
    
    if (type === 'THEME_CHANGED') {
      colorMode.preference = data
    }
  })

  const sendTheme = (theme: string) => {
    send('THEME_CHANGED', theme)
  }

  return {
    sendTheme
  }
}

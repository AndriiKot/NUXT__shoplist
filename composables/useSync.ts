export const useSync = (channelName: string) => {
  const channel = ref<BroadcastChannel | null>(null)
  
  const init = (onMessage: (event: MessageEvent) => void) => {
    if (process.client) {
      channel.value = new BroadcastChannel(channelName)
      channel.value.onmessage = onMessage
    }
  }
  
  const send = (type: string, data?: any) => {
    if (channel.value) {
      channel.value.postMessage({ type, data })
    }
  }
  
  const close = () => {
    if (channel.value) {
      channel.value.close()
    }
  }
  
  onUnmounted(() => {
    close()
  })
  
  return {
    init,
    send,
    close
  }
}
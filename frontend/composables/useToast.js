export const useToast = () => {
  const toast = useState('toast', () => ({
    show: false,
    message: '',
    type: 'success'
  }))

  const showToast = (message, type = 'success') => {
    toast.value = {
      show: true,
      message,
      type
    }

    setTimeout(() => {
      hideToast()
    }, 3000)
  }

  const hideToast = () => {
    toast.value.show = false
  }

  return {
    toast,
    showToast,
    hideToast
  }
}

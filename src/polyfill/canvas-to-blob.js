if (!window.HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(window.HTMLCanvasElement.prototype, 'toBlob', {
    value: function (callback, type, quality) {
      const binStr = window.atob(this.toDataURL(type, quality).split(',')[1])
      const len = binStr.length
      const arr = new Uint8Array(len)

      for (var i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i)
      }

      callback(new window.Blob([arr], {type: type || 'image/png'}))
    }
  })
}

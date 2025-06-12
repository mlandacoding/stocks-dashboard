<script setup>
if (
  import.meta.env.MODE === 'production' &&
  import.meta.env.VITE_GOOGLE_ANALYTICS_ID &&
  !window.gtagInitialized
) {
  const id = import.meta.env.VITE_GOOGLE_ANALYTICS_ID

  const script1 = document.createElement('script')
  script1.async = true
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`

  const script2 = document.createElement('script')
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${id}');
  `

  document.head.appendChild(script1)
  document.head.appendChild(script2)

  window.gtagInitialized = true
}
</script>

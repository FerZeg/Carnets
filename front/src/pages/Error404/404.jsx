
import './css/404.css'
import { useEffect } from 'react';

export default function Error404() {
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.jsdelivr.net/npm/tsparticles@2/tsparticles.bundle.min.js';
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://cdn.jsdelivr.net/npm/tsparticles-path-polygon@2/tsparticles.path.polygon.min.js';
    script2.async = true;
    document.body.appendChild(script2);

    const script3 = document.createElement('script');
    script3.src = '404.js';
    script3.async = true;
    document.body.appendChild(script3);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
      document.body.removeChild(script3);
    }
  }, [])
  return (
  <div id="Page404">
    <div id="glitch">404</div>
    <div id="home"><a href="/">Volver a la página principal</a></div>
  </div>
  )
}

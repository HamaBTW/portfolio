import { useEffect } from 'react';

declare global {
  interface Window {
    anime: any;
    MoveTo: any;
    Swiper: any;
    GLightbox: any;
  }
}

export const usePortfolioJS = () => {
  useEffect(() => {
    // Add preload class to html
    document.documentElement.classList.add('ss-preload');

    // Initialize immediately without waiting for external scripts
    const initializePortfolio = () => {
      console.log('Initializing portfolio functionality...');

      // Preloader functionality
      const ssPreloader = () => {
        const preloader = document.querySelector('#preloader');
        if (!preloader) return;

        const handleLoad = () => {
          console.log('Page loaded, starting preloader animation...');
          document.documentElement.classList.remove('ss-preload');
          document.documentElement.classList.add('ss-loaded');

          // Remove ss-animated class from elements
          document.querySelectorAll('.ss-animated').forEach(function(item) {
            item.classList.remove('ss-animated');
          });

          // Animate preloader out
          if (window.anime) {
            // Use anime.js timeline if available
            const tl = window.anime.timeline({
              easing: 'easeInOutCubic',
              duration: 400,
              autoplay: true
            })
            .add({
              targets: '#loader',
              opacity: 0,
              duration: 600,
              begin: function() {
                window.scrollTo(0, 0);
              }
            })
            .add({
              targets: '#preloader',
              opacity: 0,
              duration: 300,
              complete: function() {
                const preloaderEl = document.querySelector("#preloader") as HTMLElement;
                if (preloaderEl) {
                  preloaderEl.style.visibility = "hidden";
                  preloaderEl.style.display = "none";
                }
              }
            })
            .add({
              targets: '.s-header',
              translateY: [-100, 0],
              opacity: [0, 1],
              duration: 400
            }, '-=100')
            .add({
              targets: ['.s-intro .text-pretitle', '.s-intro .text-huge-title'],
              translateX: [100, 0],
              opacity: [0, 1],
              duration: 500,
              delay: window.anime.stagger(200)
            })
            .add({
              targets: '.circles span',
              keyframes: [
                {opacity: [0, .3]},
                {opacity: [.3, .1], delay: window.anime.stagger(50, {direction: 'reverse'})}
              ],
              delay: window.anime.stagger(50, {direction: 'reverse'}),
              duration: 300
            })
            .add({
              targets: '.intro-social li',
              translateX: [-50, 0],
              opacity: [0, 1],
              duration: 400,
              delay: window.anime.stagger(100, {direction: 'reverse'})
            })
            .add({
              targets: '.intro-scrolldown',
              translateY: [100, 0],
              opacity: [0, 1],
              duration: 500
            }, '-=400');
          } else {
            // Fallback CSS animation
            setTimeout(() => {
              const loader = document.querySelector('#loader') as HTMLElement;
              const preloaderEl = document.querySelector('#preloader') as HTMLElement;

              if (loader) {
                loader.style.opacity = '0';
                loader.style.transition = 'opacity 1s ease-out';
              }

              setTimeout(() => {
                if (preloaderEl) {
                  preloaderEl.style.opacity = '0';
                  preloaderEl.style.transition = 'opacity 0.8s ease-out';

                  setTimeout(() => {
                    preloaderEl.style.visibility = 'hidden';
                    preloaderEl.style.display = 'none';
                  }, 800);
                }
              }, 1000);
            }, 100);
          }
        };

        // Wait for page load
        if (document.readyState === 'complete') {
          handleLoad();
        } else {
          window.addEventListener('load', handleLoad);
        }
      };

      // Mobile Menu functionality
      const ssMobileMenu = () => {
        const toggleButton = document.querySelector('.mobile-menu-toggle');
        const mainNavWrap = document.querySelector('.main-nav-wrap');
        const siteBody = document.querySelector("body");

        if (!(toggleButton && mainNavWrap)) {
          console.log('Mobile menu elements not found');
          return;
        }

        console.log('Setting up mobile menu...');

        // Remove existing event listeners to prevent duplicates
        const newToggleButton = toggleButton.cloneNode(true) as HTMLElement;
        toggleButton.parentNode?.replaceChild(newToggleButton, toggleButton);

        newToggleButton.addEventListener('click', function(event) {
          event.preventDefault();
          console.log('Mobile menu toggle clicked');
          newToggleButton.classList.toggle('is-clicked');
          siteBody?.classList.toggle('menu-is-open');
        });

        mainNavWrap.querySelectorAll('.main-nav a').forEach(function(link) {
          link.addEventListener("click", function() {
            // at 800px and below
            if (window.matchMedia('(max-width: 800px)').matches) {
              newToggleButton.classList.toggle('is-clicked');
              siteBody?.classList.toggle('menu-is-open');
            }
          });
        });

        window.addEventListener('resize', function() {
          // above 800px
          if (window.matchMedia('(min-width: 801px)').matches) {
            if (siteBody?.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
            if (newToggleButton.classList.contains("is-clicked")) newToggleButton.classList.remove("is-clicked");
          }
        });
      };

      // Scroll Spy functionality
      const ssScrollSpy = () => {
        const sections = document.querySelectorAll(".target-section");

        function navHighlight() {
          let scrollY = window.scrollY;

          sections.forEach(function(current) {
            const htmlElement = current as HTMLElement;
            const sectionHeight = htmlElement.offsetHeight;
            const sectionTop = htmlElement.offsetTop - 50;
            const sectionId = current.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
              const navLink = document.querySelector(".main-nav a[href*=" + sectionId + "]");
              if (navLink && navLink.parentNode) {
                (navLink.parentNode as HTMLElement).classList.add("current");
              }
            } else {
              const navLink = document.querySelector(".main-nav a[href*=" + sectionId + "]");
              if (navLink && navLink.parentNode) {
                (navLink.parentNode as HTMLElement).classList.remove("current");
              }
            }
          });
        }

        window.addEventListener("scroll", navHighlight);
      };

      // View Animation functionality
      const ssViewAnimate = () => {
        const blocks = document.querySelectorAll("[data-animate-block]");
        console.log('Found animation blocks:', blocks.length);

        function viewportAnimation() {
          let scrollY = window.scrollY;

          blocks.forEach(function(current) {
            const htmlElement = current as HTMLElement;
            const viewportHeight = window.innerHeight;
            const triggerTop = (htmlElement.offsetTop + (viewportHeight * .2)) - viewportHeight;
            const blockHeight = htmlElement.offsetHeight;
            const blockSpace = triggerTop + blockHeight;
            const inView = scrollY > triggerTop && scrollY <= blockSpace;
            const isAnimated = current.classList.contains("ss-animated");

            if (inView && (!isAnimated)) {
              console.log('Animating block:', current);

              // Use anime.js if available, otherwise use CSS animations
              if (window.anime) {
                window.anime({
                  targets: current.querySelectorAll("[data-animate-el]"),
                  opacity: [0, 1],
                  translateY: [100, 0],
                  delay: window.anime.stagger(400, {start: 200}),
                  duration: 800,
                  easing: 'easeInOutCubic',
                  begin: function() {
                    current.classList.add("ss-animated");
                  }
                });
              } else {
                // Fallback CSS animation
                const elements = current.querySelectorAll("[data-animate-el]");
                elements.forEach((el, index) => {
                  const htmlEl = el as HTMLElement;
                  setTimeout(() => {
                    htmlEl.style.opacity = '1';
                    htmlEl.style.transform = 'translateY(0)';
                    htmlEl.style.transition = 'all 0.8s ease-out';
                  }, index * 200);
                });
                current.classList.add("ss-animated");
              }
            }
          });
        }

        // Initial check
        viewportAnimation();

        window.addEventListener('scroll', viewportAnimation);
        window.addEventListener('resize', viewportAnimation);
      };

      // Smooth scroll functionality
      const ssMoveTo = () => {
        if (!window.MoveTo) return;

        const easeFunctions = {
          easeInQuad: function (t: number, b: number, c: number, d: number) {
            t /= d;
            return c * t * t + b;
          },
          easeOutQuad: function (t: number, b: number, c: number, d: number) {
            t /= d;
            return -c * t* (t - 2) + b;
          },
          easeInOutQuad: function (t: number, b: number, c: number, d: number) {
            t /= d/2;
            if (t < 1) return c/2*t*t + b;
            t--;
            return -c/2 * (t*(t-2) - 1) + b;
          },
          easeInOutCubic: function (t: number, b: number, c: number, d: number) {
            t /= d/2;
            if (t < 1) return c/2*t*t*t + b;
            t -= 2;
            return c/2*(t*t*t + 2) + b;
          }
        };

        const triggers = document.querySelectorAll('.smoothscroll');

        const moveTo = new window.MoveTo({
          tolerance: 0,
          duration: 1200,
          easing: 'easeInOutCubic',
          container: window
        }, easeFunctions);

        triggers.forEach(function(trigger) {
          moveTo.registerTrigger(trigger);
        });
      };

      // Initialize all functionality
      ssPreloader();
      ssMobileMenu();
      ssScrollSpy();
      ssViewAnimate();
      ssMoveTo();
    };

    // Initialize immediately
    const timer = setTimeout(() => {
      initializePortfolio();
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      // Remove event listeners if needed
      window.removeEventListener('scroll', () => {});
      window.removeEventListener('resize', () => {});
    };
  }, []);
};

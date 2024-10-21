/*  tailwind config */

tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: "#00040f",
                secondary: "#00f6ff",
                dimWhite: "rgba(255, 255, 255, 0.7)",
                dimBlue: "rgba(9, 151, 124, 0.1)",
            },
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
        },
        screens: {
            xs: "480px",
            ss: "620px",
            sm: "768px",
            md: "1060px",
            lg: "1200px",
            xl: "1700px",
        },
    }
}

document.addEventListener('DOMContentLoaded', function () {
    /* NAVBAR */
    // Toggle mobile menu
    document.getElementById('menuToggle').addEventListener('click', function () {
        var mobileMenu = document.getElementById('mobileMenu');
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
    });

    // Set active navigation link
    window.setActiveLink = function (element) {
        document.querySelectorAll('#navLinks li').forEach(function (li) {
            li.classList.remove('text-white');
            li.classList.add('text-dimWhite');
        });
        element.classList.add('text-white');
        element.classList.remove('text-dimWhite');
    };


    /* LOADING */
    var progressBar = document.querySelector('.progress-6');
    var loadingText = document.getElementById('loadingText');
    var discountImage = document.getElementById('discountImage');

    // Listen for the end of the CSS animation on the progress bar
    progressBar.addEventListener('animationend', function () {
        loadingText.innerText = 'Loaded 100'; // Update the loading text
        discountImage.style.display = 'block'; // Show the discount image
        progressBar.style.display = 'none'; // hide progress bar
    });

    /* FORM */
    var form = document.querySelector('form');
    var submitButton = form.querySelector('button[type="submit"]'); // Select the submit button within the form

    submitButton.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent the default form submission behavior

        const inputs = form.querySelectorAll('input, textarea');
        let allFilled = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                allFilled = false;
            }
        });

        if (!allFilled) {
            alert("Please fill in all the fields.");
            return;
        }

        // Proceed with EmailJS submission if all inputs are filled
        emailjs.sendForm('service_ock2lzq', 'template_orvk07j', form, 'HT-W6XkVuOHTyLNNk')
            .then(
                function (response) {
                    console.log('SUCCESS!', response);
                    form.reset(); // Optionally reset the form
                    document.getElementById("my_modal_3").close();
                },
                function (error) {
                    console.log('FAILED...', error);
                }
            );
    });


    /* SOCIAL ICONS */

    // Get all elements with the 'social-icon' class
    var socialIcons = document.querySelectorAll('.social-icon');

    // Function to open the link in a new tab
    function openSocialLink(event) {
        var link = event.currentTarget.getAttribute('data-link');
        if (link) {
            window.open(link, '_blank');
        }
    }

    // Attach the openSocialLink function as a click event listener to each social icon
    socialIcons.forEach(function (icon) {
        icon.addEventListener('click', openSocialLink);
    });



    /* SWIPER */
    var swiper = new Swiper('.mySwiper', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            300: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            1000: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
        },
        // Enable pagination if needed
        // pagination: {
        //   el: '.swiper-pagination',
        //   clickable: true,
        // },
        // modules: [Swiper.Autoplay, Swiper.Pagination],
    });


});



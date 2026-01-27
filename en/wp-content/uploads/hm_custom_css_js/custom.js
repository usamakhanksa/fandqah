document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('.variations_form.cart');
    form.addEventListener('submit', function(event) {
        var checkboxes = document.querySelectorAll('input[name^="attribute_pa_"]:checked');
        if (checkboxes.length === 0) {
            event.preventDefault();
            alert('Please select at least one product option before adding this product to your cart.')
        }
    })
});
const displayTags = (tagsData, timeouts, homepageHero, isRepeated) => {
    const {
        tags,
        tagsText,
        horizontalLines,
        verticalLines,
        points,
        backgrounds
    } = tagsData;
    tagsData.intervals = timeouts.map((time, i) => setTimeout(() => {
        if (i !== 0) {
            tagsText[i - 1].style.opacity = 0;
            verticalLines[i - 1].style.transform = "scale(0)";
            verticalLines[i - 1].style.opacity = 0;
            horizontalLines[i - 1].style.transform = "scale(0)";
            horizontalLines[i - 1].style.opacity = 0;
            points[i - 1].style.opacity = 0;
            points[i - 1].style.transform = "scale(0)";
            homepageHero.classList.remove(backgrounds[i - 1]);
            homepageHero.classList.add(backgrounds[i])
        }
        if (i === 0 & isRepeated) {
            tagsText[timeouts.length - 1].style.opacity = 0;
            verticalLines[timeouts.length - 1].style.transform = "scale(0)";
            verticalLines[timeouts.length - 1].style.opacity = 0;
            horizontalLines[timeouts.length - 1].style.transform = "scale(0)";
            horizontalLines[timeouts.length - 1].style.opacity = 0;
            points[timeouts.length - 1].style.opacity = 0;
            points[timeouts.length - 1].style.transform = "scale(0)";
            homepageHero.classList.remove(backgrounds[backgrounds.length - 1]);
            homepageHero.classList.add(backgrounds[i])
        }
        if (i % 2 === 0) {
            tagsText[i].style.opacity = 1;
            verticalLines[i].style.transform = "scale(1)";
            verticalLines[i].style.opacity = 1;
            horizontalLines[i].style.transform = "scale(1)";
            horizontalLines[i].style.opacity = 1;
            points[i].style.opacity = 1;
            points[i].style.transform = "scale(1) translateY(0.5px)"
        } else {
            tagsText[i].style.opacity = 1;
            verticalLines[i].style.transform = "scale(1)";
            verticalLines[i].style.opacity = 1;
            horizontalLines[i].style.transform = "scale(1)";
            horizontalLines[i].style.opacity = 1;
            points[i].style.opacity = 1;
            points[i].style.transform = "scale(1) translateX(-0.5px)"
        }
    }, time))
}
window.addEventListener('load', () => {
    const homepageHero = document.querySelector('.homepage-hero')
    const homepageVideo = document.querySelector('.homepage-video');
    const tags = document.querySelectorAll('.tag-bubble__container');
    const tagsText = document.querySelectorAll('.tag-bubble');
    const horizontalLines = document.querySelectorAll('.horizontal-line');
    const verticalLines = document.querySelectorAll('.vertical-line');
    const points = document.querySelectorAll('.point');
    const timeouts = [0, 1750, 3250, 4850, 6600, 8450, 10550, 12250];
    const backgrounds = []
    let intervals
    let repeatTagsAnimation
    backgrounds.push("bg-indigo-600")
    backgrounds.push("bg-linen")
    backgrounds.push("bg-blue-600")
    backgrounds.push("bg-green-600")
    backgrounds.push("bg-linen")
    backgrounds.push("bg-indigo-600")
    backgrounds.push("bg-green-600")
    backgrounds.push("bg-linen")
    const tagsData = {
        tags,
        tagsText,
        horizontalLines,
        verticalLines,
        points,
        backgrounds,
        intervals
    }
    const startVideo = (tagsData, timeouts, homepageHero) => {
        homepageVideo.play()
        displayTags(tagsData, timeouts, homepageHero)
        repeatTagsAnimation = setInterval(() => {
            displayTags(tagsData, timeouts, homepageHero, !0)
        }, 14120)
    }
    var x = window.matchMedia("(max-width: 700px)")
    myFunction(x);

    function myFunction(x) {
        if (x.matches) {
            homepageVideo.load()
            homepageVideo.onloadeddata = function() {
                startVideo(tagsData, timeouts, homepageHero)
            }
        } else {
            startVideo(tagsData, timeouts, homepageHero)
        }
    }
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            tagsData.intervals.forEach(id => clearTimeout(id))
            clearTimeout(repeatTagsAnimation)
            homepageVideo.currentTime = 0
        } else {
            tags.forEach((tag, i) => {
                tagsText[i].style.opacity = 0
                verticalLines[i].style.opacity = 0
                horizontalLines[i].style.opacity = 0
                homepageHero.classList.remove(backgrounds[i - 1]);
                homepageHero.classList.add(backgrounds[i])
            })
            homepageVideo.currentTime = 0;
            homepageVideo.play()
            displayTags(tagsData, timeouts, homepageHero)
            repeatTagsAnimation = setInterval(() => {
                displayTags(tagsData, timeouts, homepageHero, !0)
            }, 14120)
        }
    })
})
const runSliderMobile = () => {
    const pricingSection = document.querySelectorAll('.pricing-section');
    pricingSection.forEach(pricingTable => {
        const controller = pricingTable.querySelector('.table-slider-controler')
        const controllerButton = pricingTable.querySelectorAll('.table-slider-controler__button')
        const buttonBackground = pricingTable.querySelector('.button-background')
        let activeButton = pricingTable.querySelector('.table-slider-controler__button.active')
        controllerButton.forEach((button, i) => {
            button.addEventListener('click', () => {
                activeButton.classList.remove('active')
                button.classList.add('active')
                buttonBackground.style.transform = `translateX(${(i) * controller.offsetWidth/controllerButton.length}px)`
                activeButton = button
            })
        })
    })
}
runSliderMobile()
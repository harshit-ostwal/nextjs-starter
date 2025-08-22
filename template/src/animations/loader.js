import gsap from "gsap";

export function LoaderAnimation() {
    const tl = gsap.timeline();

    tl.set("#loader", {
        "--gradient-opacity": 0,
        background: `linear-gradient(to right, 
            rgba(243, 24, 17, var(--gradient-opacity, 0)), 
            rgba(250, 240, 48, var(--gradient-opacity, 0)), 
            rgba(255, 255, 255, var(--gradient-opacity, 0)), 
            rgba(6, 144, 36, var(--gradient-opacity, 0)), 
            rgba(15, 45, 202, var(--gradient-opacity, 0))
        ), black`,
    });

    tl.fromTo(
        "#loader-heading",
        {
            visibility: "hidden",
        },
        {
            visibility: "visible",
            display: "flex",
        }
    );

    tl.fromTo(
        "#loader-heading span",
        {
            y: -25,
            opacity: 0,
        },
        {
            opacity: 1,
            stagger: 0.12,
            duration: 1,
            delay: 0.5,
            y: 0,
        }
    );

    tl.to("#loader-heading span", {
        y: -25,
        stagger: 0.12,
        duration: 1,
        opacity: 0,
    });

    tl.set("#loader", {
        background: `linear-gradient(to right, 
            rgba(243, 24, 17, var(--gradient-opacity, 0)), 
            rgba(250, 240, 48, var(--gradient-opacity, 0)), 
            rgba(255, 255, 255, var(--gradient-opacity, 0)), 
            rgba(6, 144, 36, var(--gradient-opacity, 0)), 
            rgba(15, 45, 202, var(--gradient-opacity, 0))
        ), white`,
        "--gradient-opacity": 1,
        duration: 0.5,
    });

    tl.fromTo(
        "#logo",
        {
            visibility: "hidden",
            scale: 1.05,
            filter: "blur(10px)",
            opacity: 0,
        },
        {
            visibility: "visible",
            display: "flex",
            scale: 1,
            opacity: 1,
            duration: 0.5,
            filter: "blur(0px)",
        }
    );

    return tl;
}

function scrollToInfo() {
    document.getElementById("about").scrollIntoView({
        behavior: "smooth"
    });
}

document.getElementById("subscribeForm").addEventListener(
    "submit",
    function(event) {
        event.preventDefault();

        alert("Спасибо за подписку!");

        this.reset();
    }
);
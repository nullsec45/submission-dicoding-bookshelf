export function typeNumber(input) {

    input.addEventListener("keydown", function (event) {
        const keyCode = event.which || event.keyCode;

        if (keyCode === 46 || keyCode === 8 || keyCode === 9 || keyCode === 37 || keyCode === 39) {
            return;
        }

        if (keyCode >= 48 && keyCode <= 57) {
            return;
        }
        event.preventDefault();
    });
}
document.getElementById('donatie').addEventListener('change', () => {
    let style = this.value == "Bani" ? 'block' : 'none';
    document.getElementById('don-type-container').style.display = style;
});

// aici e o problema ca daca schimbi din monetar in altceva si dupa inapoi nu mai reapare casuta
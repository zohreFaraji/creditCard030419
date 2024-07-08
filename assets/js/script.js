const pop = document.querySelector('.pop');
const popOops = document.querySelector('.popOops');
const form = document.querySelector('form');
const cardHolder = document.querySelector('form>fieldset>.holder');
const labelHolder = document.querySelector('.card-holder>div');
const inp = document.querySelectorAll('form>fieldset>.input-cart-number');
const sel = document.querySelector('.fieldset-expiration>.select>#card-expiration-month');
const lableSel = document.querySelector('.card-expiration-date>.span1');
const lableSel2 = document.querySelector('.card-expiration-date>.span2');
const sel2 = document.querySelector('.fieldset-expiration>.select>#card-expiration-year');
const cvv = document.querySelector('.fieldset-ccv>#card-ccv');
const lableCcv = document.querySelector('.back>.ccv');
const btn = document.querySelector('form>button');
const number = document.querySelector('.number');

inp.forEach((val, i) => {
    val.addEventListener('input', () => {
        if (val.value >= 0 || val.value <= 9) {
            val.value = val.value.slice(0, 4);
        } else {
            val.value = ''
        }

        if (val.value.length === 4) {
            if (i !== 3) {
                inp[i + 1].focus();
            } else {
                cardHolder.focus();
            }
        }
        updateCardNumberDisplay();
    });

    val.addEventListener('keydown', (e) => {
        if (i !== 0 && val.value.length === 0 && e.key === 'Backspace') {
            inp[i - 1].focus();
        }
    });
});

function updateCardNumberDisplay() {
    number.innerHTML = '';
    inp.forEach((val, i) => {
        let temp = val.value;
        if (i === 3) {
            number.innerHTML += temp;
        } else {
            number.innerHTML += temp.length === 4 ? temp + ' - ' : temp;
        }
    });
}

cardHolder.addEventListener('keyup', (e) => {

    if (cardHolder.value.length > 25) {
        labelHolder.innerHTML = cardHolder.value.slice(0, 25)
        cardHolder.value = cardHolder.value.slice(0, 25)
        sel.focus();
    } else {
        labelHolder.innerText = cardHolder.value
    }

    if (cardHolder.value.length === 0 && e.key === 'Backspace') {
        inp[3].focus();
    }
});


sel.addEventListener('input', () => {
    if (sel.value.length === 2) {
        sel2.focus();
    }
    let val = `${sel.value} / `
    lableSel.innerHTML = val
});

sel.addEventListener('keydown', (e) => {
    if (sel.value.length === 0 && e.key === 'Backspace') {
        cardHolder.focus();
    }
});

sel2.addEventListener('input', () => {
    if (sel2.value.length === 4) {
        cvv.focus();
    }
    lableSel2.innerHTML = sel2.value
});

sel2.addEventListener('keydown', (e) => {
    if (sel2.value.length === 0 && e.key === 'Backspace') {
        sel.focus();
    }
});

cvv.addEventListener('input', () => {
    if (cvv.value >= 0 || cvv.value <= 9) {
        cvv.value = cvv.value
    } else {
        cvv.value = ''
    }
    if (cvv.value.length === 3) {
        btn.style.border = '2px solid #0099ff';
        btn.focus();
    }
    lableCcv.innerHTML = cvv.value
});

cvv.addEventListener('keydown', (e) => {
    if (cvv.value.length === 0 && e.key === 'Backspace') {
        sel2.focus();
    }
});

cvv.addEventListener('focus', () => {
    document.body.classList.add('cvv-focused');
});

cvv.addEventListener('blur', () => {
    document.body.classList.remove('cvv-focused');
});

btn.addEventListener('click', (e) => {
    e.preventDefault()
    if (cardHolder.value != '' && inp.value != 0 && sel.value != 0 && sel2.value != 0 && cvv.value != 0) {
        pop.classList.remove('hide')
    }
    else {
        popOops.classList.remove('hide')
    }
})
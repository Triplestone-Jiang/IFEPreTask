import sort, {queue} from './Sort'

let $ = document.querySelector.bind(document),
    $$ = selector=>[...document.querySelectorAll(selector)],
    num = +$('#number').value,
    time = +$('#time').value,
    sorted = false

export {time}

const generator = num=> {
    let html = '',
        style = '',
        factor = 300,
        i = 0,
        width = 40,
        height

    while (i < num) {
        height = Math.floor(Math.random() * (factor - 20)) + 20
        style = `height:${height}px;
               width:${width}px;
               margin-left:${i++ * width}px;
               line-height:${height}px;
               transition:all ${time}ms`

        html += `<div class="col" style="${style}">${height}</div>`
    }
    $('.container').innerHTML = html
}

const clickHandler = event=> {
    let target = event.target,
        cols = $$('.col')
    if (target.className === 'sort') {
        if (queue.timeId) {
            return
        }
        sort[target.textContent](cols)
        if (!sorted) {
            sorted = true
            queue.execute()
        } else {
            queue.list = []
        }
    }
}

const inputHandler = event=> {
    let target = event.target,
        cols = $$('.col')
    switch (target.id) {
        case 'number':
            let n = +target.value
            if (n) {
                num = n
                if (!queue.timeId) {
                    generator(n)
                }
            }
            break
        case 'time':
            let t = +target.value
            if (t) {
                time = t
                queue.list.forEach(i=>i.time = t)
                cols.forEach(i=>i.style.transition = `all ${t}ms`)
            }
            break
    }
}

let panel = $('#panel')

panel.addEventListener('click', clickHandler)
panel.addEventListener('input', inputHandler)

generator(num)
import Queue from './Queue'
import {time} from './main'

export let queue = new Queue()

const transition = (node1, node2, isLift)=> {
    const lift = ()=> {
        queue.add(function () {
            node1.classList.toggle('lift')
            node2.classList.toggle('lift')
        }, time)
    }

    isLift && lift()
    queue.add(function () {
        let left = node1.style.marginLeft
        node1.style.marginLeft = node2.style.marginLeft
        node2.style.marginLeft = left
    }, time)
    isLift && lift()
}

const print = (method, arr, span, start)=> {
    queue.add(function () {
        console.log(`动画持续时间:${(Date.now() - start) / 1000}秒`)
    }, time)

    console.log(arr.map(i=>+i.textContent))
    console.table({
            Results: {
                '排序方式': method,
                '排序数量': arr.length,
                '排序用时': span + '毫秒'
            }
        },
        ['排序方式', '排序数量', '排序用时'])
}

export default {
    bubblingSort (arr) {
        let start = Date.now()

        for (let i = 0, l = arr.length; i < l; i++) {
            for (let j = l - 1; j > i; j--) {
                if (+arr[j - 1].textContent > +arr[j].textContent) {
                    [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
                    transition(arr[j], arr[j - 1])
                }
            }
        }

        print('冒泡排序', arr, Date.now() - start, start)

        return arr
    },
    exchangeSort (arr){
        let start = Date.now()

        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (+arr[i].textContent > +arr[j].textContent) {
                    [arr[i], arr[j]] = [arr[j], arr[i]]
                    transition(arr[i], arr[j])
                }
            }
        }

        print('交换排序', arr, Date.now() - start, start)

        return arr
    },
    quickSort(arr){
        const partition = (arr, i, j)=> {
            let m = +arr[Math.floor((i + j) / 2)].textContent
            while (i <= j) {
                while (+arr[i].textContent < m) {
                    i++
                }
                while (+arr[j].textContent > m) {
                    j--
                }
                if (i <= j) {
                    [arr[i], arr[j]] = [arr[j], arr[i]]
                    i !== j && transition(arr[i], arr[j], true)
                    i++
                    j--
                }
            }
            return i
        }
        const st = (arr, i, j)=> {
            if (arr.length > 1) {
                let index = partition(arr, i, j)
                i < index - 1 && st(arr, i, index - 1)
                j > index && st(arr, index, j)
            }
        }

        let start = Date.now()
        st(arr, 0, arr.length - 1)
        print('快速排序', arr, Date.now() - start, start)
        return arr
    }
}
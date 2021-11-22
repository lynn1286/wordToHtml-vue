const mammoth = require('mammoth')
const fs = require('fs')
const _ = require('underscore')
const template = require('./template')

function transformElement(element) {
    if (element.children) {
        const children = _.map(element.children, transformElement)
        element = { ...element, children: children }
    }
    if (element.type === 'paragraph') {
        element = transformParagraph(element)
    }
    return element
}

function transformParagraph(element) {
    if (element.alignment === 'center' && !element.styleId) {
        return { ...element, styleName: 'center' }
    } else {
        return element
    }
}

const options = {
    styleMap: ['u => u', "p[style-name='center'] => p.center"],
    transformDocument: transformElement
}

/**
 * @description: word2html
 * @param {*}
 * @return {*}
 */
export const word2html = files => {
    if (!files.length) return

    const file = files[0]
    return new Promise((res, rej) => {
        console.time()
        const reader = new FileReader()
        reader.onloadend = function (event) {
            const arrayBuffer = reader.result

            mammoth
                .convertToHtml({ arrayBuffer: arrayBuffer }, options)
                .then(function (result) {
                    const html = result.value
                    const messages = result.messages

                    const strHtml = template(html)

                    console.timeEnd()

                    res(strHtml)
                })
                .done()
        }

        reader.readAsArrayBuffer(file)
    })
}

/**
 * @description: word2RawText
 * @param {*}
 * @return {*}
 */
export const word2RawText = files => {
    if (!files.length) return
    const file = files[0]

    console.time()
    const reader = new FileReader()
    reader.onloadend = function (event) {
        const arrayBuffer = reader.result

        mammoth
            .extractRawText({ arrayBuffer: arrayBuffer }, options)
            .then(function (result) {
                const RawText = result.value
                const messages = result.messages

                console.log(RawText)
            })
            .done()

        console.timeEnd()
    }

    reader.readAsArrayBuffer(file)
}
/**
 * @description: word2Markdown
 * @param {*}
 * @return {*}
 */
export const word2Markdown = files => {
    if (!files.length) return
    const file = files[0]

    console.time()
    const reader = new FileReader()
    reader.onloadend = function (event) {
        const arrayBuffer = reader.result

        mammoth
            .convertToMarkdown({ arrayBuffer: arrayBuffer }, options)
            .then(function (result) {
                const Markdown = result.value
                const messages = result.messages

                console.log(Markdown)
            })
            .done()

        console.timeEnd()
    }

    reader.readAsArrayBuffer(file)
}

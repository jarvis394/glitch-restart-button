// ==UserScript==
// @name         Glitch Restart Button
// @namespace    https://github.com/jarvis394/glitch-restart-button
// @version      1.0.0
// @description  Adds reload button to your Glitch project!
// @author       jarvis394
// @match        https://glitch.com/edit/
// @run-at       document-start
// @grant        none
// @license      MIT
// @iconURL      https://i.ibb.co/s9pfQH3/Flat-restart-icon-svg-1.png
// @updateURL    https://openuserjs.org/meta/jarvis394/Glitch_Restart_Button.meta.js
// @downloadURL  https://openuserjs.org/src/scripts/jarvis394/Glitch_Restart_Button.user.js
// ==/UserScript==

(function () {
  'use strict'

  let el

  /**
   * Adds styles to a page
   * @param {string} css Styles
   */
  const addCSS = (css) => {
    let head = document.getElementsByTagName('head')[0]

    if (!head) return

    let style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = css
    head.appendChild(style)
  }

  /**
   * Reloads current project
   */
  const reloadProject = () => {
    const user = JSON.parse(localStorage.getItem('cachedUser')) || {}
    const token = user.persistentToken
    const project = window.location.hash.slice(3).split('?')[0]

    if (!token) return alert('Can\'t find your Glitch token, sorry!')
    if (!project) return alert('Can\'t parse your project name, sorry!')

    fetch(`https://api.glitch.com/projects/${project}/stop?authorization=${token}`, {
      method: 'POST'
    }).then(res => {
        if (res.status === 401) return alert('Sorry, you are not allowed to restart this project!')
    })
  }

  /**
   * Adds button
   */
  const addButton = () => {
    el = document.createElement('button')
    el.innerHTML = 'Restart'
    el.className += 'button-small btn-restart-fixed'
    el.disabled = false
    el.onclick = () => reloadProject()

    document.body.appendChild(el)
  }

  window.addEventListener('load', () => {
    addButton()
    addCSS(`
      .btn-restart-fixed {
        position: fixed;
        z-index: 999;
        bottom: 12px;
        right: 12px;
      }
    `)
  })
})()

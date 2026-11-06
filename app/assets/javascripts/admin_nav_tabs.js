// Sync nav tab active state; pane visibility is CSS in kubik_interface_elements admin_fieldset.
function tabPaneForHash(hash, tabContent) {
  if (!hash || !tabContent) return hash

  if (tabContent.querySelector(`:scope > #${CSS.escape(hash)}`)) return hash

  const target = document.getElementById(hash)
  if (!target) return hash

  const pane = target.closest(".tab-content > div[id]")
  return pane?.id || hash
}

function scrollToHashTarget(hash) {
  if (!hash) return
  const target = document.getElementById(hash)
  if (!target) return
  window.requestAnimationFrame(() => {
    target.scrollIntoView({ block: "start", behavior: "smooth" })
  })
}

export function syncAdminNavTabsActive() {
  document.querySelectorAll("#active_admin_content ul.nav-tabs").forEach((nav) => {
    const content = nav.nextElementSibling
    if (!content?.classList.contains("tab-content")) return

    const panes = content.querySelectorAll(":scope > div[id]")
    if (!panes.length) return

    const rawHash = window.location.hash ? window.location.hash.slice(1) : ""
    let activeId = rawHash ? tabPaneForHash(rawHash, content) : ""
    if (!activeId || !content.querySelector(`#${CSS.escape(activeId)}`)) {
      activeId = panes[0].id
    }

    nav.querySelectorAll("li").forEach((li) => li.classList.remove("active"))
    const activeLink = nav.querySelector(`a[href="#${CSS.escape(activeId)}"]`)
    activeLink?.closest("li")?.classList.add("active")

    if (rawHash && rawHash !== activeId) {
      scrollToHashTarget(rawHash)
    }
  })
}

function boot() {
  syncAdminNavTabsActive()
}

document.addEventListener("DOMContentLoaded", boot)
document.addEventListener("turbo:load", boot)
window.addEventListener("hashchange", boot)

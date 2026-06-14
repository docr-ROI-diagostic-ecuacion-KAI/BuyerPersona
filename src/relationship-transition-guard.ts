const relationshipGuardId = "docroi-relationship-builder-guard";

function installRelationshipGuard() {
  if (document.querySelector(`[data-docroi-relationship-builder="1"][data-guard="${relationshipGuardId}"]`)) return;

  const guard = document.createElement("div");
  guard.dataset.docroiRelationshipBuilder = "1";
  guard.dataset.guard = relationshipGuardId;
  guard.hidden = true;
  guard.setAttribute("aria-hidden", "true");
  document.body.appendChild(guard);
}

installRelationshipGuard();
window.addEventListener("DOMContentLoaded", installRelationshipGuard);

export {};

const scene = document.querySelector('a-scene');
const swapMoleculeAction = document.getElementById('swap-molecule');
const moleculeList = document.querySelector('.ui__molecule-list');
const closeMoleculeList = document.querySelector('.ui__molecule-list__close');
const moleculeListButtons = Array.from(document.querySelectorAll('.ui__molecule'));
const molecule = document.getElementById('molecule');

const toggleMoleculeList = () => moleculeList.classList.toggle('ui__molecule-list--hidden');

const swapMolecule = (event) => {
  const { value } = event.target.dataset;
  
  molecule.setAttribute('molecule', 'name', value);
  moleculeListButtons.forEach((moleculeButton) => {
    moleculeButton.classList.remove('ui__molecule--active');
  });
  event.target.classList.add('ui__molecule--active');
  toggleMoleculeList();
};

swapMoleculeAction.addEventListener('click', toggleMoleculeList);
closeMoleculeList.addEventListener('click', toggleMoleculeList);
moleculeListButtons.forEach((moleculeButton) => {
  moleculeButton.addEventListener('click', swapMolecule);
});

const rotateXButton = document.getElementById('rotate-molecule-x');
const rotateYButton = document.getElementById('rotate-molecule-y');

const toggleAnimation = (component) => () => {
  if (component.animationIsPlaying) {
    component.data.pauseEvents.forEach((event) => {
      component.el.emit(event) 
    });
  } else {
    component.data.resumeEvents.forEach((event) => {
      component.el.emit(event) 
    });
  }
};

rotateXButton.addEventListener('click', toggleAnimation(molecule.components.animation__rotation_x));
rotateYButton.addEventListener('click', toggleAnimation(molecule.components.animation__rotation_y));

const moveButton = document.getElementById('move-molecule');
const toggleMove = () => {
  const { enabled } = scene.getAttribute('ar-hit-test');
  
  scene.setAttribute('ar-hit-test', 'enabled', !enabled);
};

moveButton.addEventListener('click', toggleMove);
const loader = new THREE.PDBLoader();

const molecules = {
  caffeine: 'https://raw.githubusercontent.com/rollup/three-jsnext/master/examples/models/molecules/caffeine.pdb',
  ethanol: 'https://raw.githubusercontent.com/rollup/three-jsnext/master/examples/models/molecules/ethanol.pdb',
  aspirin: 'https://raw.githubusercontent.com/rollup/three-jsnext/master/examples/models/molecules/aspirin.pdb',
  cholesterol: 'https://raw.githubusercontent.com/rollup/three-jsnext/master/examples/models/molecules/cholesterol.pdb',
  cocaine: 'https://raw.githubusercontent.com/rollup/three-jsnext/master/examples/models/molecules/cocaine.pdb',
  glucose: 'https://raw.githubusercontent.com/rollup/three-jsnext/master/examples/models/molecules/glucose.pdb',
};

AFRAME.registerComponent('molecule', {
  schema: {
    name: { type: 'string', default: Object.keys(molecules)[0] }
  },
  parseProp(prop, index) {
    return {
      x: prop.getX(index),
      y: prop.getY(index),
      z: prop.getZ(index),
    };
  },
  createSphere({ position, color }) {
    const sphere = document.createElement('a-sphere');
    const { x, y, z } = position;
    
    sphere.setAttribute('color', `#${color}`);
    sphere.setAttribute('radius', '0.3');
    sphere.setAttribute('position', `${x} ${y} ${z}`);
    
    this.el.appendChild(sphere);
  },
  createText({ position, color, atom }) {
    const text = document.createElement('a-text');
    const { x, y, z } = position;

    text.setAttribute('value', atom[4]);
    text.setAttribute('align', 'center');
    text.setAttribute('color', `#${color}`);
    text.setAttribute('position', `${x} ${y - 0.5} ${z}`);
    text.setAttribute('look-at', '#camera');
    
    this.el.appendChild(text);
  },
  createBond(start, end) {
    const box = document.createElement('a-box');
    
    box.object3D.position.copy(start);
    box.object3D.position.lerp(end, 0.5);
    box.object3D.scale.set(0.1, 0.1, start.distanceTo(end));
    box.object3D.lookAt(end);
    
    this.el.appendChild(box);
  },
  draw({ geometryAtoms, geometryBonds, json }) {
    const atomPositions = geometryAtoms.getAttribute('position');
    const atomColors = geometryAtoms.getAttribute('color');
    const bondPositions = geometryBonds.getAttribute('position');
    const bondStart = new THREE.Vector3();
    const bondEnd = new THREE.Vector3();
    const color = new THREE.Color();
    
    for (let i = 0; i < atomPositions.count; i++) {
      const position = this.parseProp(atomPositions, i);
      const { x: r, y: g, z: b } = this.parseProp(atomColors, i);
  
      color.setRGB(r, g, b);
      this.createSphere({ position, color: color.getHexString() });
      this.createText({ position, color: color.getHexString(), atom: json.atoms[i] });
    }
    
    for (let i = 0; i < bondPositions.count; i += 2) {
      const start = this.parseProp(bondPositions, i);
      const end = this.parseProp(bondPositions, i + 1);

      bondStart.set(start.x, start.y, start.z);
      bondEnd.set(end.x, end.y, end.z);
      
      this.createBond(bondStart, bondEnd);
    }
  },
  clearElements() {
    const children = Array.from(this.el.children);
    
    children.forEach((child) => {
      child.remove();
    });
  },
  update() {
    const { name } = this.data
    
    this.clearElements();
    loader.load(molecules[name], this.draw.bind(this));
  },
});

AFRAME.registerComponent('ar-hit-toggle', {
  schema: {
    objects: { type: 'selectorAll' },
    message: { type: 'selector' },
  },
  events:{
    'ar-hit-test-start'() {
      this.data.objects.forEach((object) => {
        object.setAttribute('visible', 'false');
      });
      
      this.data.message.classList.remove('ui__message--hidden');
    },
    'ar-hit-test-achieved'() {
      this.data.message.innerHTML = 'Select the location to place by tapping on the screen';
    },
    'ar-hit-test-select'() {
      this.data.objects.forEach((object) => {
        object.setAttribute('visible', 'true');
      });

      this.el.setAttribute('ar-hit-test', 'enabled', 'false');
      this.data.message.classList.add('ui__message--hidden');
    },
    'exit-vr'() {
      this.data.objects.forEach((object) => {
        object.setAttribute('visible', 'true');
        object.object3D.position.set(0, 1.6, -2);
        object.object3D.rotation.set(0, 0, 0);
      });
      
      this.data.message.classList.add('ui__message--hidden');
    },
  },
});

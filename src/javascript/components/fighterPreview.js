import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  if(fighter !== undefined){
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
      tagName: 'div',
      className: `fighter-preview___root ${positionClassName}`,
    });
    const { name, health, attack, defense } = fighter;

    const pName = createElement({
      tagName: 'p',
      className: 'fighter-preview_text'
    });
    pName.innerText = `Name: ${name}`;

    const pHealth = createElement({
      tagName: 'p',
      className: 'fighter-preview_text'
    });
    pHealth.innerText = `Health: ${health}`;

    const pAttack = createElement({
      tagName: 'p',
      className: 'fighter-preview_text'
    });
    pAttack.innerText = `Attack: ${attack}`;

    const pDefense = createElement({
      tagName: 'p',
      className: 'fighter-preview_text'
    });
    pDefense.innerText = `Defense: ${defense}`;
    const fighterImage = createFighterImage(fighter, `${position}-fighter-preview_img`);
    fighterElement.append(pName, pHealth, pAttack, pDefense,fighterImage);

    return fighterElement;
  }
  else
    return ''
}

export function createFighterImage(fighter, nameOfClass = 'fighter-preview___img') {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: nameOfClass,
    attributes,
  });

  return imgElement;
}

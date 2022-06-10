import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {

  let winner;

  let healthFirst  = firstFighter.health;
  let healthSecond  = secondFighter.health;

  const firstIndicator = document.getElementById(`left-fighter-indicator`);
  const secondIndicator = document.getElementById(`right-fighter-indicator`);
  const firstKeysForCriticalHit = controls.PlayerOneCriticalHitCombination;
  const secondKeysForCriticalHit = controls.PlayerTwoCriticalHitCombination;

  let firstBlocked = false;
  let secondBlocked = false;

  let extraDamage = true;

  return new Promise((resolve, reject) => {
    document.addEventListener('keydown', (event) => {

      if(event.code === controls.PlayerOneAttack && !firstBlocked){
        healthSecond = ChangeHealth(firstFighter, secondFighter, secondBlocked, healthSecond, 1);
      }

      else if(event.code === controls.PlayerTwoAttack && !secondBlocked) {
        healthFirst = ChangeHealth(secondFighter, firstFighter, firstBlocked, healthFirst, 1);
      }
      winner = ChangeIndicator(firstFighter, secondFighter, firstIndicator, secondIndicator, healthFirst, healthSecond, winner);
      if (winner !== undefined)
        resolve(winner)

    }, false);

    document.addEventListener('keydown', (event)=>{
      if(event.code === controls.PlayerOneBlock)
        firstBlocked = true;
      else if(event.code === controls.PlayerTwoBlock)
        secondBlocked = true;
      else{
        if (event.repeat) return;
        controls.arrChars.push(event.code);
      }
    });

    document.addEventListener('keyup', (event)=>{
      if(event.code === controls.PlayerOneBlock)
        firstBlocked = false;
      else if(event.code === controls.PlayerTwoBlock)
        secondBlocked = false;
      else if (extraDamage){

        let runFunc = true;
        console.log(controls.arrChars)
        for (let arg of firstKeysForCriticalHit) {
          console.log(controls.arrChars)
          if (!controls.arrChars.includes(arg)) {
            runFunc = false;
            break;
          }
        }
        if (runFunc) {
          healthSecond = ChangeHealth(firstFighter, secondFighter, secondBlocked, healthSecond, 2);
          extraDamage = false;
          setTimeout(()=>{
            extraDamage = true;
          }, 10000);
        }
        if (!runFunc){
          runFunc = true;
          for (let arg of secondKeysForCriticalHit) {
            if (!controls.arrChars.includes(arg)) {
              runFunc = false;
              break;
            }
          }
          if (runFunc) {
            healthFirst = ChangeHealth(secondFighter, firstFighter, firstBlocked, healthFirst, 2);
            extraDamage = false;
            setTimeout(()=>{
              extraDamage = true;
            }, 10000);
          }
        }
        controls.arrChars.length = 0;
      }
      winner = ChangeIndicator(firstFighter, secondFighter, firstIndicator, secondIndicator, healthFirst, healthSecond, winner);
      if (winner !== undefined)
        resolve(winner)
    });
  });
}

export function getDamage(attacker, defender, blocked, coefficient) {
  const { attack } = attacker;
  const hit = getHitPower(attack * coefficient);
  let block;
  if(blocked || coefficient === 1)
    block = getBlockPower(defender);
  else
    block = 0;
  const damage = hit - block;
  if(damage < 0)
    return 0;
  return damage;
}

export function getHitPower(fighter) {
  const criticalHitChance = Math.random() * 2 + 1;
  return fighter * criticalHitChance;
}

export function getBlockPower(fighter) {
  const dodgeChance = Math.random() * 2 + 1;
  const { defense } = fighter;
  return defense * dodgeChance;
}

function ChangeIndicator(firstFighter, secondFighter, firstIndicator, secondIndicator, healthFirst, healthSecond, winner){
  firstIndicator.style.width = `${(100 * healthFirst) / firstFighter.health}%`;
  secondIndicator.style.width = `${(100 * healthSecond) / secondFighter.health}%`;

  if(healthFirst === 0)
    winner = secondFighter;
  else if(healthSecond === 0)
    winner = firstFighter
  return winner;
}

function ChangeHealth(attacker, definer, block, health, coefficient){
  const damage = getDamage(attacker, definer, block, coefficient);
  health -= damage;
  if(health < 0)
    health = 0;
  return health;
}

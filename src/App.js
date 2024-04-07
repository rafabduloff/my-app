import {useState, useEffect} from 'react'

const BusinessWindow = ({ income, onUpgrade, upgradeCost, level, unlocked, onUnlock, unlockCost }) => {

  if (!unlocked) {
    return (
      <button 
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110"
        onClick={onUnlock}
      >
        Unlock for ${unlockCost}
      </button>
    );
  }

  return (
    <div className="bg-gray-700 p-5 rounded-lg shadow-lg">
      <p className="text-xl mb-4">Income: <span className="font-bold">${income.toFixed(2)}</span> per second</p>
      <p className="text-xl mb-4">Your Level: <span className="font-bold">{level}</span></p>
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110"
        onClick={onUpgrade}
      >
        Upgrade for ${upgradeCost.toFixed(2)}
      </button>
    </div>
  );
};

const BuisnessGame = () => {
  const resetGame = () => {
    // Сброс состояний до начальных значений
    setBalance(0);
    setIncome(1);
    setUpgradeCost(10);
    setUpgradeCount(0);

    setSecondWindowUnlocked(false);
    setSecondIncome(0);
    setSecUpgradeCost(100);
    setSecUpgradeCount(0);

    setThirdWindowUnlocked(false);
    setThirdIncome(0);
    setThirdUpgradeCost(10000);
    setThirdUpgradeCount(0);

    // Очистка localStorage
    localStorage.clear();
  };
  //first bussiness
  const [balance, setBalance] = useState(() => Number(localStorage.getItem('balance')) || 0);
  const [income, setIncome] = useState(() => Number(localStorage.getItem('income')) || 1);
  const [upgradeCost, setUpgradeCost] = useState(() => Number(localStorage.getItem('upgradeCost')) || 10);
  const [upgradeCount, setUpgradeCount] = useState(() => Number(localStorage.getItem('upgradeCount')) || 0);

  //second bussiness
  const [secondWindowUnlocked, setSecondWindowUnlocked] = useState(() => Number(localStorage.getItem('secondWindowUnlocked')) || 0);
  const [secondIncome, setSecondIncome] = useState(() => Number(localStorage.getItem('secondIncome')) || 0);
  const [secUpgradeCost, setSecUpgradeCost] = useState(() => Number(localStorage.getItem('secUpgradeCost')) || 100);
  const [secUpgradeCount, setSecUpgradeCount] = useState(() => Number(localStorage.getItem('secUpgradeCount')) || 0);
  
  //third bussiness
  const [thirdWindowUnlocked, setThirdWindowUnlocked] = useState(() => Number(localStorage.getItem('thirdWindowUnlocked')) || 0);
  const [thirdIncome, setThirdIncome] = useState(() => Number(localStorage.getItem('thirdIncome')) || 0);
  const [thirdUpgradeCost, setThirdUpgradeCost] = useState(() => Number(localStorage.getItem('thirdUpgradeCost')) || 10000);
  const [thirdUpgradeCount, setThirdUpgradeCount] = useState(() => Number(localStorage.getItem('thirdUpgradeCount')) || 0);

  const secondUnlockCost = 1000;
  const thirdUnlockCost = 50000;

  useEffect(() => {
    // Сохранение текущего состояния в localStorage
    const saveState = () => {
      localStorage.setItem('balance', balance.toString());
      localStorage.setItem('income', income.toString());
      localStorage.setItem('upgradeCost', upgradeCost.toString());
      localStorage.setItem('upgradeCount', upgradeCount.toString());
      //second Window
      localStorage.setItem('secondWindowUnlocked', secondWindowUnlocked ? '1' : '0');
      localStorage.setItem('secondIncome', secondIncome.toString());
      localStorage.setItem('secUpgradeCost', secUpgradeCost.toString());
      localStorage.setItem('secUpgradeCount', secUpgradeCount.toString());
      //third Window
      localStorage.setItem('thirdWindowUnlocked', thirdWindowUnlocked ? '1' : '0');
      localStorage.setItem('thirdIncome', thirdIncome.toString());
      localStorage.setItem('thirdUpgradeCost', thirdUpgradeCost.toString());
      localStorage.setItem('thirdUpgradeCount', thirdUpgradeCount.toString());
    };

    // Вызов сохранения состояния при изменении любого из состояний
    saveState();
  }, [balance, income, upgradeCost, upgradeCount, secondWindowUnlocked, secondIncome, secUpgradeCost, secUpgradeCount, thirdWindowUnlocked, thirdIncome, thirdUpgradeCost, thirdUpgradeCount]);

    useEffect(() => {
      const interval = setInterval(() => {
        setBalance((currentBalance) => currentBalance + income + secondIncome + thirdIncome);
      }, 1000);
      
      return() =>
        clearInterval(interval);
    }, [income + secondIncome + thirdIncome])

    const purshcaseUpgrade = () => {
      if (balance >= upgradeCost) {
        setIncome(currentIncome => currentIncome * 1.3);
        setBalance(currentBalance => currentBalance - upgradeCost)
        setUpgradeCount(upgradeCount => upgradeCount + 1);

        setUpgradeCost(currentCost => currentCost * 2);

        if ((upgradeCount + 1) % 5 === 0) {
          setIncome(currentIncome => currentIncome * 1.5);
        }
        if ((upgradeCount + 1) % 10 === 0) {
          setIncome(currentIncome => currentIncome * 2);
        }
      } else {
        alert("balance not enough!");
      }
    };

    const unlockSecondWindow = () => {
      
      if (balance >= secondUnlockCost && !secondWindowUnlocked) {
        
      setBalance(prevBalance => prevBalance - secondUnlockCost);
       setSecondWindowUnlocked(true);
       localStorage.setItem('secondWindowUnlocked', '1');
      } else {
        alert("Not enough balance to unlock!");
      }
    };

    const unlockThirdWindow = () => {
      if (balance >= thirdUnlockCost && !thirdWindowUnlocked) {
        setBalance(prevBalance => prevBalance - thirdUnlockCost);
        setThirdWindowUnlocked(true);
        localStorage.setItem('thirdWindowUnlocked', '2');
      } else {
        alert('Not enough balance to unlock!');
      }
    };
     
    const secPurshcaseUpgrade = () => {
      if (balance >= secUpgradeCost) {
        setSecondIncome(currentsecondIncome => currentsecondIncome * 1.6 + 10);
        setBalance(prevBalance => prevBalance - secUpgradeCost);
        setSecUpgradeCount(secUpgradeCount + 1);

        setSecUpgradeCost(currentsecCost => currentsecCost * 3);
        if ((secUpgradeCount + 1) % 5 === 0){
          setSecondIncome(currentsecondIncome => currentsecondIncome * 1.25)
        }
        if ((secUpgradeCount + 1) % 10 === 0){
          setSecondIncome(currentsecondIncome => currentsecondIncome * 1.5) && setSecUpgradeCost(currentsecCost => currentsecCost * 1.25);
        }
        if ((secUpgradeCount + 1) % 100 === 0){
          setSecondIncome(currentsecondIncome => currentsecondIncome * 1.5);
        }
    } else {
      alert("balance not enough!");
    }
  };

  const thirdPurshcaseUpgrade = () => {
    if (balance >= thirdUpgradeCost) {
      setThirdIncome(currentthirdIncome => currentthirdIncome * 1.5 + 100);
      setBalance(prevBalance => prevBalance - thirdUpgradeCost);
      setThirdUpgradeCount(thirdUpgradeCount + 1);

      setThirdUpgradeCost(currentthirdCost => currentthirdCost * 5);
      if ((thirdUpgradeCount + 1) % 5 === 0){
        setThirdIncome(currentthirdIncome => currentthirdIncome * 1.5)
      }
      if ((secUpgradeCount + 1) % 10 === 0){
        setThirdIncome(currentthirdIncome => currentthirdIncome * 1.5) && setSecUpgradeCost(currentsecCost => currentsecCost * 1.5);
      }
      if ((secUpgradeCount + 1) % 100 === 0){
        setThirdIncome(currentthirdIncome => currentthirdIncome * 1.5);
      }
  } else {
    alert("balance not enough!");
    }
  }

    return (
      <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center">
      <button onClick={resetGame} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110">Start Over</button>
      <h1 className="text-4xl font-bold mb-6">Business Game</h1>
      <p className="text-xl mb-4">Balance: <span className="font-bold">${balance.toFixed(2)}</span></p>
      <div className="flex flex-wrap justify-center gap-4">
        <BusinessWindow
          income={income}
          onUpgrade={purshcaseUpgrade}
          upgradeCost={upgradeCost}
          level={upgradeCount}
          unlocked={true}
        />
        <BusinessWindow
          income={secondIncome}
          onUpgrade={secPurshcaseUpgrade}
          upgradeCost={secUpgradeCost}
          level={secUpgradeCount}
          unlocked={secondWindowUnlocked}
          onUnlock={unlockSecondWindow}
          unlockCost={secondUnlockCost}
        />
          <BusinessWindow
          income={thirdIncome}
          onUpgrade={thirdPurshcaseUpgrade}
          upgradeCost={thirdUpgradeCost}
          level={thirdUpgradeCount}
          unlocked={thirdWindowUnlocked}
          onUnlock={unlockThirdWindow}
          unlockCost={thirdUnlockCost}
        />
        
      </div>
    </div>
  );
};
export default BuisnessGame;
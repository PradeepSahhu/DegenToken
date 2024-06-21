# DegenToken Game using ERC20 from openzeppelin

This smart contract depicts the Degen Game Token.

## Due to Limited Fuji Faucet i can't fully test it on Fuji network however i tested it on Sepolia testnet.

- Still I was able to deploy it on Fuji testnet

- I fully tested it on sepolia testnet with all the mentioned functionalities.

<img width="1174" alt="image" src="https://github.com/PradeepSahhu/DegenGameToken-ERC20/assets/94203408/8db3a4c7-93d2-4a1b-af94-20805a61d716">

- Verify (https://43113.testnet.snowtrace.io/token/0x1bf972B7b7bEF9036628cE0bF0ca7AD42D6cD130) & (https://43113.testnet.snowtrace.io/token/0xc8F60e266016aE7f7cCEE1040cDa885862693D47)

## The snowtrace Api key is paid now so, i verified the contract at sepolia testnet through etherscan api

<img width="837" alt="image" src="https://github.com/PradeepSahhu/DegenGameToken-ERC20/assets/94203408/969ff41f-47d8-4e96-a6c7-1951595a4b92">

Link To visit Verified Smart Contract : [https://sepolia.etherscan.io/address/0x01a5Cd1BE2b1732BBeB6AfC9c4B3c31874Fe07C8#code](https://sepolia.etherscan.io/address/0x4249056c7c5646A8660C1b65EB2546D90567Ae11#code)

## Code Explanation

```Solidity

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

Importing the OpenZeppelin ERC20 Contract and inheriting it to my contract using `is` keyword.

Using the constructor initlializing the owner state variable and value of Each Token such that later it can be redeem by anyone for fixed amount of wei in return. and minting some token
for this contract as well.

```Solidity
 constructor(uint _amount, uint _tokenToMint) ERC20("Degen","DGN"){
        owner = msg.sender;
        tokenValueInWei = _amount;
        _mint(msg.sender, _tokenToMint); // very small amount because it takes high gas fees
    }
```

Minting the reward Token for another account ( its like giving the reward in the form of Tokens)

- I am not minning and transfering tokens because to save the transaction cost.

```Solidity

 ///@notice to reward a certain user by _amount amount only callable by the owner.

    function mintTokenReward(address _address,uint _amount) external onlyOwner{
        _mint(_address,_amount);
    }
```

Through this checkingBalance function anyone can check his/her token balance.
In degen game it will help to show/display/check the token balance of the current account.

```Solidity

  ///@notice for checking the balance of token of caller account.


    function checkingBalance() external view returns(uint){
        return balanceOf(msg.sender);
    }

```

Through transferTokens transfering some amount of tokens from the caller account to the recipient account by some required check i.e user must have equal to greater than that tokens.
In degen Game it will help to share game resources with other players.

```Solidity
function tranferTokens(address _recepient, uint _amount) external{
        require(balanceOf(msg.sender) >= _amount);
       transfer(_recepient, _amount);

    }
```

Redeeming some tokens for some game asset in the game however in this scenerio redeeming the token for some amount of wei set by the owner.

```Solidity

 ///@notice redeeming the tokens for some items of the game (in this game for wei)

    function redeemTokens(uint _tokenAmount) external payable{
        require(balanceOf(msg.sender) >= _tokenAmount);
        _transfer(msg.sender, owner, _tokenAmount);
       uint valueWei = _tokenAmount * tokenValueInWei;
        (bool callMsg,) = payable(msg.sender).call{value: valueWei}("");
        require(callMsg);
    }
```

Burning the game assets or Degen Game tokens.

```Solidity


 ///@notice burn the _tokenAmount amount of token

    function burnToken(uint _tokenAmount) external {
        require( balanceOf(msg.sender)>=_tokenAmount);
        _burn(msg.sender, _tokenAmount);
    }

```

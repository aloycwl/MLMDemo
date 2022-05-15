async function refreshInfo() {}

async function load() {
  if (typeof ethereum != 'undefined') {
    web3 = new Web3(ethereum);
    web3 = web3.eth;
    acct = await ethereum.request({ method: 'eth_requestAccounts' });
    frm = { from: acct[0], gas: 21e5 };
    if ((await web3.net.getId()) != 4) {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x4' }],
      });
      location.reload();
    }
    contract = new web3.Contract(
      [
        {
          inputs: [
            {
              internalType: 'address',
              name: 'referral',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'months',
              type: 'uint256',
            },
          ],
          name: 'Deposit',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'Staking',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'a',
              type: 'address',
            },
          ],
          name: 'getDownlines',
          outputs: [
            {
              internalType: 'address[]',
              name: '',
              type: 'address[]',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'a',
              type: 'address',
            },
          ],
          name: 'getUplines',
          outputs: [
            {
              internalType: 'address',
              name: 'd1',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'd2',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'd3',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          name: 'user',
          outputs: [
            {
              internalType: 'address',
              name: 'upline',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'wallet',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'lastClaimed',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'dateJoined',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'months',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'balances',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      ],
      '0x80BB34c189D43C6c3b3FB8B7921A6A389Ed92198'
    );
    contract = contract.methods;

    contract2 = new web3.Contract(
      [
        {
          inputs: [
            {
              internalType: 'address',
              name: 'spender',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'approve',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
          ],
          name: 'balanceOf',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      ],
      '0x80BB34c189D43C6c3b3FB8B7921A6A389Ed92198'
    );
    contract2 = contract2.methods;
    _s = location.hash.substring(1);
    $('#txtRB').html(
      _s.length > 1 && _s != acct[0]
        ? _s
        : '0x0000000000000000000000000000000000000000'
    );
    $('#txtRef').val(acct[0]);
  }
}
async function deposit() {
  await contract2
    .approve('0x80BB34c189D43C6c3b3FB8B7921A6A389Ed92198', 1000)
    .send({
      from: acct[0],
      value: 0.0e18,
    });
  await contract.Deposit(acct[0], 1000, 9).send({
    from: acct[0],
    value: 0.0e18,
  });
  location.reload();
}
async function stake() {
  await contract.Staking().send({
    from: acct[0],
    value: 0.0e18,
  });
  location.reload();
}
load();
$(document).ready(function () {
  setInterval(async function () {
    if (typeof ethereum != 'undefined') {
      d = await web3.getAccounts();
      if (d.length > 0) {
        $('#connect').hide();
        $('#root').show();
        refreshInfo();
      } else $('#connect').show();
    } else $('#connect').html('No Metamask');
  }, 1000);
});

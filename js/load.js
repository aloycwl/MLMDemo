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
      [],
      '0x80BB34c189D43C6c3b3FB8B7921A6A389Ed92198'
    );
    contract = contract.methods;
  }
}
async function deposit() {}
async function stake() {}
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

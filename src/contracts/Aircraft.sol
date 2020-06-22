pragma solidity >=0.4.21 <0.7.0;
import "./Aircraftmaintaince.sol";
import "./AircraftAdmin.sol";

contract Aircraft is Aircraftmaintainer,AircraftAdmin {
   address public owner;
   uint public maintainerCount = 0;

  mapping (address => string) public hashInfo;

//   struct Aeroplane { 
//    string filename;
//    string filetype;
//    string filesecret;
// }

constructor() public {
    owner = msg.sender;
  }

modifier onlyowner() {
    if (msg.sender == owner) _;

  }

// modifier CheckfileAccess(string memory role,address id,string fileHashId,address pat){
//         uint256  pos ;
        
//         if(keccak256(abi.encodePacked("role"))!=keccak256(abi.encodePacked("maintainer"))){
//          require(maintainerToAdmin[pat][id] > 0);
//              pos = maintainerToFile[pat][fileHashId];
//             require(pos > 0);
//         }
//         if(keccak256(abi.encodePacked("role"))!=keccak256(abi.encodePacked("Admin"))){
//                 pos = patienToFile[id][fileHashId];
//                 require(pos > 0); 
//         }
//         _;
//     }

    function checkProfile(address _user) public view returns(string memory, string memory){
      maintainer memory p = maintainers[_user];
      Admin memory d = Admins[_user];
      
      if(p.id == _user)
          return (p.name, 'maintainer');
      else if(d.id == _user)
          return (d.name, 'Admin');
      else
          return ('default', 'default');
  }

  function addFile(string memory _hashId) public {
       maintainer memory p = maintainers[msg.sender];
        // require (patienToFile[msg.sender][fileHashId]<1);//checking already exist 

        hashInfo[msg.sender] = _hashId;
        
        p.file = _hashId;
       
        // patienToFile[msg.sender][fileHashId]=fileCount;
        // fileCount=fileCount+1;
  }

function grantAccessToAdmin(address _id) public {
     maintainer memory p = maintainers[msg.sender];
        // Admin memory d = Admins[_id];

        // uint pos= p.doctorList.push(_docterId);
        adminList[msg.sender].push(_id);
        maintainerToAdmin[msg.sender][_id] = maintainerCount;
        maintainerList[_id].push(msg.sender);
        maintainerCount = maintainerCount+1;
}

  //  function air(string _hashId,string memory _filename, string memory _filetype, string memory _filesecret) public {

  //   hashInfo[_hashId] = Aeroplane({filename : _filename, filetype : _filetype,filesecret : _filesecret});
   
  // }

  function getmaintainerInfoForAdmin(address _id) public view returns(string memory _name,uint age,address id,string memory files ){
      maintainer memory p = maintainers[_id]; 
      require(AdminTomaintainer[msg.sender][_id]>1);
      return  (p.name,p.age,p.id,p.file);
    }

function getFileInfomaintainer(address _id, string memory _fileHashId) public view returns (string memory name, uint8 age,address id,string memory _file,address[] memory _list){
            (string memory  __name ,uint8 __age,address __id,string memory __file) = getinfomaintaince();
        return(__name,__age,__id,__file,adminList[msg.sender]);
     }

}
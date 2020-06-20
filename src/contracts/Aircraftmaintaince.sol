pragma solidity >=0.4.21 <0.7.0;  
// pragma experimental ABIEncoderV2;

contract Aircraftmaintainer{

mapping(address => maintainer) public maintainers;     
mapping(address=> mapping(address=>uint)) public maintainerToAdmin;      
mapping(address=> bytes32) public maintainerToFile;      
mapping(address=> address[]) public adminList;


struct maintainer{

    string name;       
    uint8 age;         
    address id;
    bytes32 file;     
       
  }

   function signup( string memory _name, uint8 _age  ) public {

  maintainers[msg.sender] = maintainer({name : _name, age : _age,id:msg.sender,file : ""});
   
  }  

  function getinfomaintaince() public view returns(string memory _name, uint8 _age , address id, bytes32 __file ){
     maintainer memory m = maintainers [msg.sender];
     return(m.name,m.age,m.id,m.file);
      
       
  }


  
}
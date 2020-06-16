pragma solidity >=0.4.21 <0.7.0;  
pragma experimental ABIEncoderV2;

contract Aircraftmaintainer{

mapping(address => maintainer) public maintainers;     
mapping(address=> mapping(address=>uint)) public maintainerToAdmin;      
mapping(address=> bytes32) public maintainerToFile;      


struct maintainer{

    string name;       
    uint8 age;         
    address id;
    bytes32 file;    
    address[] admin;  
       
  }

   function signup( string memory _name, uint8 _age  ) public {

  maintainers[msg.sender] = maintainer({name : _name, age : _age,id:msg.sender,file : "" ,admin : new address[](0)});
   
  }  

  function getinfomaintaince() public view returns(maintainer memory _maintainer){
      return maintainers[msg.sender] ;
       
  }


  
}
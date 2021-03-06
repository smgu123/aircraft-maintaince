pragma solidity >=0.4.21 <0.7.0;  
// pragma experimental ABIEncoderV2;

contract Aircraftmaintainer{

mapping(address => maintainer) public maintainers;     
mapping(address=> mapping(address=>uint)) public maintainerToAdmin;      
mapping(address=> string) public maintainerToFile;      
mapping(address=> address[]) public adminList;


struct maintainer{

    string name;       
    uint8 age;         
    address id;
    string file;     
       
  }

   function maintainersignup( string memory _name, uint8 _age  ) public {

  maintainers[msg.sender] = maintainer({name : _name, age : _age,id:msg.sender,file : ""});
   
  }  

  function getinfomaintaince() public view returns(string memory _name, uint8 _age , address id, string memory __file ){
     maintainer memory m = maintainers [msg.sender];
     return(m.name,m.age,m.id,m.file);
      
       
  }


  
}
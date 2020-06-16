
pragma solidity >=0.4.21 <0.7.0;  
pragma experimental ABIEncoderV2;

contract AircraftAdmin{

mapping(address => Admin) public Admins;     
mapping(address=> mapping(address=>uint)) public AdminTomaintainer;       


struct Admin{

    string name;               
    address id;    
    address[] maintainer;     
  }

   function signup( string memory _name) public {

  Admins[msg.sender] = Admin({name : _name, id:msg.sender,maintainer : new address[](0)});
   
  }  

  function getinfoAdmin() public view returns(string memory _name,address id,address[] memory maintainer){
      Admin memory s = Admins[msg.sender] ;
       return(s.name,s.id,s.maintainer);
  }
  
}
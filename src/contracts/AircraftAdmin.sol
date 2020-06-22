
pragma solidity >=0.4.21 <0.7.0;  

contract AircraftAdmin{

mapping(address => Admin) public Admins;     
mapping(address=> mapping(address=>uint)) public AdminTomaintainer;   
mapping(address=>address[])public maintainerList;

struct Admin{

    string name;               
    address id;    
        
  }

   function Adminsignup( string memory _name) public {

  Admins[msg.sender] = Admin({name : _name, id:msg.sender});
   
  }  

  function getinfoAdmin() public view returns(string memory _name,address id,address[] memory maintainer){
      Admin memory s = Admins[msg.sender] ;
       return(s.name,s.id,maintainerList[msg.sender]);
  }
  
}
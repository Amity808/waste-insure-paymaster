// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;



contract Marketplace {
    // string public product;
    uint internal productsLength = 0;
   
    struct Product {
        address payable owner;
        // a payable modifier that allows your contract to send tokens to this address. This variable will be named owner because it’s the address of the user who submitted the product.
        string name;
        string image;
        string description;
        string location;
        uint256 price;
        uint256 sold;
        uint256 quantity;
        bool available;
    }

    modifier onlySeller() {
        require(becomeSeller[msg.sender], "Must be a collector");
        _;
    }

    mapping(uint256 => Product) internal products;

    mapping(address => bool) public becomeSeller;

    function assignSeller(address payable _seller) public {
        require(_seller != address(0), "Invalid producer address");
        require(becomeSeller[_seller] != true, "You are aready a seller");
        becomeSeller[_seller] = true;
    }

    function writeProduct(
        string memory _name,
        string memory _image,
        string memory _description,
        string memory _location,
        uint256 _price,
        uint256 _quantity
    ) public onlySeller {
        uint _sold = 0;
        // require(_quantity > 0, "Quantity Must be greater than zero");
        products[productsLength++] = Product(
            payable(msg.sender),
            // msg.sender returns the address of the entity that is making the call, it is also payable. This is what you are going to save as the owners’ address.
            _name,
            _image,
            _description,
            _location,
            _price,
            _sold,
            _quantity,
            true
        );
    }

    function readProduct(
        uint _index
    )
        public
        view
        returns (
            address payable,
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            uint256,
            uint256,
            bool
        )
    {
        Product storage product = products[_index];
        return (
            product.owner,
            product.name,
            product.image,
            product.description,
            product.location,
            product.price,
            product.sold,
            product.quantity,
            product.available
        );
    }

    // to buy a product
    function buyproduct(uint _index) public payable {
        require(products[_index].quantity > 0, "there is no product left");
        
        (bool sent, ) = products[_index].owner.call{ value: products[_index].price}("");
        // (bool sent, ) = wasteAdmin.call{value: _amount}("");
        require(sent, "Failed to send Ether");

        products[_index].sold++;
        products[_index].quantity--;
        if (products[_index].quantity == 0) {
            products[_index].available = false;
        }
    }

    function updateProduct(
        uint256 _index,
        uint256 _quantity,
        uint256 _price
    ) public {
        products[_index].quantity = _quantity;
        products[_index].price = _price;
    }

    function getProductsLength() public view returns (uint) {
        return (productsLength);
    }
}
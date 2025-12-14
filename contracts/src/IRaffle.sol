// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Raffle.sol";

/**
 * @title RaffleFactory
 * @author PX Raffle Protocol
 * @notice Factory responsável por criar e registrar todos os raffles
 */
contract RaffleFactory {
    /*//////////////////////////////////////////////////////////////
                                STORAGE
    //////////////////////////////////////////////////////////////*/

    address public owner;

    address[] private raffles;

    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    event RaffleCreated(
        address indexed raffle,
        address indexed creator,
        uint256 ticketPrice,
        uint256 totalTickets
    );

    /*//////////////////////////////////////////////////////////////
                                MODIFIERS
    //////////////////////////////////////////////////////////////*/

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    /*//////////////////////////////////////////////////////////////
                                CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor() {
        owner = msg.sender;
    }

    /*//////////////////////////////////////////////////////////////
                            VIEW FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function getAllRaffles()
        external
        view
        returns (address[] memory)
    {
        return raffles;
    }

    function rafflesCount()
        external
        view
        returns (uint256)
    {
        return raffles.length;
    }

    /*//////////////////////////////////////////////////////////////
                            CORE FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function createRaffle(
        uint256 ticketPrice,
        uint256 totalTickets
    ) external returns (address raffleAddress) {
        require(ticketPrice > 0, "Invalid ticket price");
        require(totalTickets > 0, "Invalid ticket amount");

        Raffle raffle = new Raffle(
            msg.sender,
            ticketPrice,
            totalTickets
        );

        raffleAddress = address(raffle);
        raffles.push(raffleAddress);

        emit RaffleCreated(
            raffleAddress,
            msg.sender,
            ticketPrice,
            totalTickets
        );
    }
}

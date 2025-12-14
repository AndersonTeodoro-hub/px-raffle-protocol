// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IRaffle.sol";

/**
 * @title Raffle
 * @author PX Raffle Protocol
 * @notice Implementação oficial de um raffle individual
 */
contract Raffle is IRaffle {
    /*//////////////////////////////////////////////////////////////
                                STORAGE
    //////////////////////////////////////////////////////////////*/

    address public immutable factory;
    address public immutable owner;

    uint256 public immutable override ticketPrice;
    uint256 public immutable override totalTickets;

    uint256 public override ticketsSold;

    address[] private participants;

    RaffleStatus public override status;
    address public override winner;

    bool private prizeClaimed;

    /*//////////////////////////////////////////////////////////////
                                MODIFIERS
    //////////////////////////////////////////////////////////////*/

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    modifier onlyOpen() {
        require(status == RaffleStatus.OPEN, "Raffle not open");
        _;
    }

    modifier onlyWinner() {
        require(msg.sender == winner, "Not winner");
        _;
    }

    /*//////////////////////////////////////////////////////////////
                                CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor(
        address _owner,
        uint256 _ticketPrice,
        uint256 _totalTickets
    ) {
        require(_ticketPrice > 0, "Invalid ticket price");
        require(_totalTickets > 0, "Invalid total tickets");

        factory = msg.sender;
        owner = _owner;

        ticketPrice = _ticketPrice;
        totalTickets = _totalTickets;

        status = RaffleStatus.OPEN;
    }

    /*//////////////////////////////////////////////////////////////
                            VIEW FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function getParticipants()
        external
        view
        override
        returns (address[] memory)
    {
        return participants;
    }

    /*//////////////////////////////////////////////////////////////
                            CORE FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function buyTickets(uint256 amount)
        external
        payable
        override
        onlyOpen
    {
        require(amount > 0, "Invalid amount");
        require(
            ticketsSold + amount <= totalTickets,
            "Not enough tickets left"
        );
        require(
            msg.value == amount * ticketPrice,
            "Incorrect ETH value"
        );

        for (uint256 i = 0; i < amount; i++) {
            participants.push(msg.sender);
        }

        ticketsSold += amount;

        emit TicketPurchased(msg.sender, amount);

        if (ticketsSold == totalTickets) {
            _closeRaffle();
        }
    }

    function closeRaffle()
        external
        override
        onlyOwner
        onlyOpen
    {
        _closeRaffle();
    }

    function _closeRaffle() internal {
        status = RaffleStatus.CLOSED;
        emit RaffleClosed();
    }

    function drawWinner()
        external
        override
        onlyOwner
    {
        require(status == RaffleStatus.CLOSED, "Raffle not closed");
        require(participants.length > 0, "No participants");

        uint256 randomIndex = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    block.prevrandao,
                    participants.length
                )
            )
        ) % participants.length;

        winner = participants[randomIndex];
        status = RaffleStatus.DRAWN;

        emit WinnerDrawn(winner);
    }

    function claimPrize()
        external
        override
        onlyWinner
    {
        require(status == RaffleStatus.DRAWN, "Winner not drawn");
        require(!prizeClaimed, "Prize already claimed");

        prizeClaimed = true;

        uint256 prize = address(this).balance;
        require(prize > 0, "No prize");

        (bool success, ) = payable(winner).call{value: prize}("");
        require(success, "Transfer failed");

        emit PrizeClaimed(winner, prize);
    }
}

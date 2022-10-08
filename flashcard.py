#!/usr/bin/python3
from dataclasses import dataclass
import random
import json
import webbrowser


@dataclass
class Card:
    context: str
    front: str
    back: str


def LoadJson(filename: str):
    f = open(filename)
    return json.load(f)


def CreateCards(data):
    holder = []
    for i in data["flashcards"]:
        holder.append(Card(i["context"], i["front"], i["back"]))
    return holder


def GetRandomCard():
    return random.choice(cards)


def ShuffleCards():
    cards = CreateCards(data)
    for i in cards:
        if random.randint(0, 1) == 1:
            i.front, i.back = i.back, i.front


data = LoadJson("flashcards.json")
cards = CreateCards(data)
ShuffleCards()

from re import I
from flask import Flask, Blueprint, render_template, request, flash, session, redirect, url_for
from datetime import datetime
import json
import requests
from . import main
import os
from dotenv import load_dotenv
load_dotenv()

@main.route('/', methods=['GET','POST'])
def mainmap(): 
    maps_api_key=os.getenv('maps_api_key')
    return render_template('mainmap.html',maps_api_key=maps_api_key)

@main.route('/conditionEntered', methods=['GET','POST'])
def conditionEntered(): 
    user_selection_dict=json.loads(json.dumps(request.get_json()))
    condition=user_selection_dict['condition']
    city=user_selection_dict['city']
    print(f'my city {city} and condition {condition} should appear')
    return [([41.805548, -87.921358], '11,000'),([43.673100, -87.921858], '12,000'),([43.673100, -87.991858], '18,000')]
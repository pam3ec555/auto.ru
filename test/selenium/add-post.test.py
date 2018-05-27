from selenium import webdriver
import time
import os

LOGIN = 'test2'
PASSWORD = 'test2'
ACTION_TIMEOUT = 1
HOSTNAME = 'localhost'
PORT = '9002'
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

driver = webdriver.Chrome()
driver.get(HOSTNAME + ':' + PORT + '/login')

driver.find_element_by_name('login').send_keys(LOGIN)
driver.find_element_by_name('password').send_keys(PASSWORD)

driver.find_element_by_id('submit').click()

time.sleep(ACTION_TIMEOUT)

menuShow = driver.find_element_by_id('menu-show')
menuShow.click()

time.sleep(ACTION_TIMEOUT)

addPostBtn = driver.find_element_by_id('add-post')
addPostBtn.click()

CAR = dict(
    brand='Kia',
    model='Rio',
    bodyType='Седан',
    engineVolume='3.6',
    enginePower='200',
    engineType='Бензин',
    boxTransmission='AT',
    wheelTransmission='Полный',
    leftHelm='Левый',
    state='Отличное',
    originalPTS='Оригинал',
    ownerCount='2',
    year='2010',
    mileage='100000',
    color='Черный',
    address='Казань',
    price='1000000',
    description='Хорошая машина'
)

for key in CAR:
    driver.find_element_by_name(key).send_keys(CAR[key])

# driver.find_element_by_name('photos').send_keys(ROOT_DIR + '/fixtures/photo.jpeg')

driver.find_element_by_id('submit').click()

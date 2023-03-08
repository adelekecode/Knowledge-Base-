FROM python:3.11.2-alpine

WORKDIR /backend

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

ENV MYKEY=GW#bbWrob8^E_=9QebEqNrw)TmCoHUwdq#xVjji&@((!@WV@^@%)!!197x237xAp8QyH_&6DfPN^dAmFYgF_E6enOZnU#j3+

EXPOSE 8000

RUN python manage.py migrate

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]


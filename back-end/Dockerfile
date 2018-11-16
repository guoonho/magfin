FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

ADD ./ ./
ENV FLASK_ENV development
ENV FLASK_APP magfin

CMD ["flask", "run", "--host=0.0.0.0"]

FROM python:3.12.0-alpine3.18
MAINTAINER jo

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt
RUN apk add --update --no-cache postgresql-client jpeg-dev
RUN apk add --update --no-cache --virtual .tmp-build-deps gcc libc-dev linux-headers postgresql-dev musl-dev zlib zlib-dev
RUN pip install -r /requirements.txt
RUN apk del .tmp-build-deps

RUN mkdir /backend
WORKDIR /backend
COPY ./backend /backend

RUN mkdir -p /vol/web/media
RUN mkdir -p /vol/web/static
RUN adduser -D user
RUN chown -R user:user /vol/
RUN chmod -R 755 /vol/web
USER user

# Command to run migrations and start the server
CMD ["sh", "-c", "python manage.py makemigrations && \
                  echo 'Migrations completed successfully' && \
                  python manage.py migrate && \
                  echo 'Database migration completed successfully' && \
                  python manage.py runserver 0.0.0.0:8000 && \
                  echo 'Server started successfully'"]

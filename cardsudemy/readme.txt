JWK_KEY = ASDF

kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf

docker build -t gg/measurements .
docker build -t gg/stations .
docker build -t gg/auth .

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud/deploy.yaml

skaffold.dev

kubectl get pods

mongoimport --uri "mongodb://stations-mongo-srv:27017/stations" --collection stations --drop --file knmi_stations_2018.json

sudo nano /etc/hosts   127.0.0.1 measuring.dev
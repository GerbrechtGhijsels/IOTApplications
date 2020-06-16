JWK_KEY = ASDF

kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf

docker build -t gg/measurements:1.0 .
docker build -t gg/stations:1.0 .
docker build -t gg/auth:1.0 .

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud/deploy.yaml

skaffold.dev

kubectl get pods

mongoimport --uri "mongodb://stations-mongo-srv:27017/stations" --collection stations --drop --file knmi_stations_2018.json
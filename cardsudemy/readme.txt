JWK_KEY = ASDF

kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf


kubectl create namespace cert-manager
docker build -t gg/measurements ./measurements
docker build -t gg/stations ./stations
docker build -t gg/auth ./auth
docker build -t gg/requester ./requester

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud/deploy.yaml

skaffold.dev
skaffold dev --no-prune

kubectl get pods

mongoimport --uri "mongodb://stations-mongo-srv:27017/stations" --collection stations --drop --file knmi_stations_2018.json

sudo nano /etc/hosts   127.0.0.1 measuring.dev

kubectl exec -it auth-mongo-depl-d4cc77cf6-5w5fl sh
mongo mongodb://auth-mongo-depl-d4cc77cf6-5w5fl.db:27017

kubectl port-forward auth-mongo-depl-d4cc77cf6-5w5fl 27017:27017


kubectl port-forward stations-mongo-depl-6b646cf8db-p57nj 27017:27017

-----------------------------------------------------------
DB ports

127.0.0.1 30007 30008 30009

-----------------------------------------------------------
db Import

Works when host computer is restarted and no other localhost are started.

mongoimport --host 127.0.0.1:30007 --jsonArray --db stations --collection stations --drop --file stations.json

mongoimport --host 127.0.0.1:30008 --jsonArray --db measurements --collection measurements --drop --file measurements.json

-----------------------------------------------------------

Api calls

https://measuring.dev/api/users/signout   POST

https://measuring.dev/api/users/signin    POST
{
"email": "test@test.com",
"password": "test"
}


https://measuring.dev/api/users/signup    POST
{
	"email": "test@test.com",
	"password": "test"
}


https://measuring.dev/api/users/currentuser  GET

-----------------------------------------------------------
Skaffold build


skaffold.dev
skaffold dev --no-prune
skaffold run
skaffold build
skaffold dev  -w client

-----------------------------------------------------------
docker image build

docker build -t gg/measurements ./measurements
docker build -t gg/stations ./stations
docker build -t gg/auth ./auth

-----------------------------------------------------------
JWT

JWK_KEY = ASDF

kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf

-----------------------------------------------------------
Ingress

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud/deploy.yaml

-----------------------------------------------------------
etc/host

sudo nano /etc/hosts   127.0.0.1 measuring.dev

-----------------------------------------------------------
SSL ANGULAR

ng serve \
    --ssl true \
    --ssl-cert "/home/john/ssl/example.crt" \
    --ssl-key "/home/john/ssl/example.key"

https://medium.com/@rubenvermeulen/running-angular-cli-over-https-with-a-trusted-certificate-4a0d5f92747a

-----------------------------------------------------------
skaffold dev --filename='skaffold_frontend.yaml'
skaffold dev --filename='skaffold_backend.yaml'

skaffold dev --filename='skaffold_frontend_mock.yaml'

-----------------------------------------------------------
knmi api key:
eyJvcmciOiI1ZTU1NGUxOTI3NGE5NjAwMDEyYTNlYjEiLCJpZCI6IjcwNWE2NDRmZjRhMjQ4NzA5YzgzMTdjZjk0MTkxYzNhIiwiaCI6Im11cm11cjEyOCJ9

https://api.dataplatform.knmi.nl/open-data/datasets/Actuele10mindataKNMIstations/versions/2/files
